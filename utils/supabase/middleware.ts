import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {

    //auth has been disabled since it's a demo app only

 /* try {

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );


    const user = await supabase.auth.getUser();



    if (request.nextUrl.pathname !== "/sign-in" && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    */

  //&& !user.error


    if (request.nextUrl.pathname === "/" ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
/*
    return response;
  } catch (e) {

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
  */
};
