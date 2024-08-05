import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import next from "next";

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

    //create token
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //sign token
    const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    //return success message
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    //set token in cookie for client
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    //return response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
