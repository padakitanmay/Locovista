import bcrypt from "bcryptjs/dist/bcrypt";

export const AdminLogin = async (req, res) => {
  try {
   
    const {email} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({message : "User not found"})
    }

    if(user.role != "admin"){
        return res.status(401).json({message : "User is not Admin"})
    }

     const checkCorrectPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
    
                if (!checkCorrectPassword) {
                        return res
                            .status(401)
                            .json({ success: false, message: "Wrong password!" });
                    }
            
                    const { password, role, ...rest } = user._doc;
            
                    // Create JWT token
                    const token = jwt.sign(
                        { id: user._id, role: user.role },
                        process.env.JWT_SECERET_KEY,
                        { expiresIn: "15d" }
                    );
            
                    // ✅ Set token as cookie
                    res.cookie("accessToken", token, {
                        httpOnly: true,
                        secure: false, // Set to true in production
                        sameSite: "Lax", // or 'None' if cross-domain with HTTPS
                        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
                    });
            
                    return res.status(200).json({
                        token,
                        success: true,
                        message: "successfully login",
                        data: { ...rest },
                        role,
                    });

    
  } catch (err) {
     console.log(err);
        res.status(500).json({ success: false, message: "Failed to login" });
  }
};