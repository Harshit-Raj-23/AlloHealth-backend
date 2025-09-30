import { User } from "../models/user.model.js";

const seedFrontDeskUser = async () => {
    const existing = await User.findOne({
        username: "frontdesk"
    });
    if (!existing) {
        const user = new User({
            username: "frontdesk",
            password: "12345",
            role: "frontdesk"
        });
        await user.save();
        console.log(`Frontdesk user created!!`);
    } else {
        console.log(`Frontdesk user already exists`);
    }
};

export default seedFrontDeskUser;