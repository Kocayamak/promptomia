import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Bu e-posta adresi zaten kullanılıyor"],
        required: [true, "E-posta adresi gereklidir"],
    },
    username: {
        type: String,
        required: [true, "Kullanıcı adı gereklidir"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});


const User = models.User || model("User", userSchema);

export default User;