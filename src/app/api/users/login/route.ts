import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

dbConnect();

export async function POST(request: NextRequest) {
  try {

    //get user details from request body
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists in db
    const user = await User.findOne({ email });

    //if user does not exist, return error message
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("User exists");

    //compare password
    const validPassword = await bcryptjs.compare(password, user.password);
    
    //if password is invalid, return error message
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenPayload = {
        id: user._id,
        username: user.username,
        email: user.email,
    }
    const secret= process.env.JWT_SECRET | "harsh";
    const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
