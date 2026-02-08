const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  
});

userSchema.methods.matchPassword = function (plainPassword) {
  const hashedPassword = createHmac("sha256", this.salt)
    .update(plainPassword)
    .digest("hex");

  return this.password === hashedPassword;
};

module.exports = model("User", userSchema);
