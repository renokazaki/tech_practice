// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";

// export async function POST(req: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const body = await req.json();
//     const { name, img } = body;

//     if (!name || !img) {
//       return new NextResponse("Missing required fields", { status: 400 });
//     }

//     const user = await prisma.user.create({
//       data: {
//         userId,
//         name,
//         img,
//       },
//     });

//     return NextResponse.json(user);
//   } catch (error) {
//     console.log("[USERS_POST]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
