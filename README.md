

<p align="center">
 a demo app for managing employees salaries
</p>



## Tech stack

- Next js app router, tailwind css for front end
- supabase for auth
- asp net core web api as backend



## Clone and run locally


1. clone the repo using

   ```bash
   git clone <this repo url>
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd <project>
   ```
4. install the modules

   ```bash
   npm install
   ```


4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```
   The web app should now be running on [localhost:3000](http://localhost:3000/).


6. the test gmail would be test@g.com and the password is 123




