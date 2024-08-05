import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    //get user details from request body
    const reqBody = await request.json();

    //get token from request body
    const { token } = reqBody;
    console.log("This is the token from /api/users/verifyemail: ", token);

    //check if user exists in db
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    //if user does not exist, return error message
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    console.log(user);

    //update user details
    user.isVerified = true;
    //clear token and expiry
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    //save user to db
    await user.save();

    //return success message
    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
