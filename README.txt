# Alinda Preparatory School - improved website files

## Included
- Updated public homepage (`index.html`)
- Updated shared visual styling (`style.css`)
- Corrected Firebase web SDK module imports and cleaned Firebase config (`firebase-config.js`)
- Updated staff, DOS, bursar and directors pages with the shared stylesheet and valid Firebase SDK import URLs. The uploaded DOS and bursar files ended mid-script; their missing closing structure and basic form handlers have been reconstructed.

## Important before publishing
1. Back up your existing website folder first.
2. Replace the files in your project with these versions only after keeping the backup.
3. The Firebase web configuration is a client-side identifier, not a security boundary. Configure strict Firebase Authentication and Firestore Security Rules for every collection. Never rely on hiding a page or checking a role only in browser JavaScript.
4. The current bursar payment confirmation flow performs multiple separate Firestore writes. It should be redesigned with a trusted backend/Cloud Function and an atomic transaction before real money or official accounting records are involved. Do not use this front-end flow as a production financial system.
5. The public visitor verification code is checked against `settings/publicAccess`. Create that document and restrict reads/writes appropriately. The old hard-coded fallback passcode has been removed.
6. Only six source files were supplied. `style.css` was missing and is now included. The referenced `headteacher.html`, `gallery.html`, and `pupil.html` pages were not supplied, so their full features cannot be repaired or verified in this package.
7. Test with a local web server (not by opening HTML with `file://`) because Firebase ES modules require a web origin.

## Suggested test
From the project directory run:
`python3 -m http.server 8000`
Then open `http://localhost:8000`.

Check browser developer tools for Firebase configuration, Firestore rules, missing pages, and permission errors.

## Additional pages added in the continuation
- `headteacher.html`: role-restricted dashboard for publishing public notices and viewing recent admissions and staff requests.
- `gallery.html`: public gallery fed by `school_gallery`; signed-in staff, headteacher and directors can publish image URLs.
- `pupil.html`: pupil portal showing the pupil's finance summary, marks and school notices.

## Data fields expected by the added pages
- `users/{uid}`: `role`, `fullName`, and for pupil accounts `admissionNo` (or `pupilId`); optional `classLevel`.
- `school_gallery` documents: `title`, `description`, `imageUrl`, `published`, `createdAt`, `postedBy`.
- `pupil_marks` documents: `pupilId` should match the pupil's `admissionNo`; fields include `pupilName`, `classLevel`, `subject`, `score`, `grade`, and optionally `term`.
- `pupils` documents: `admissionNo`, `feeBalance`, `foodStatus`, `uniformStatus`.
- `school_notices` documents: `title`, `body`, `postedBy`, `createdAt`, `published`.

The new pages are syntactically checked, and local page links were checked. They have not been live-tested against your Firebase project. Their buttons require valid Firebase Authentication accounts, matching user-role documents, and Firestore rules that allow the intended operations. The pupil portal also requires each pupil account to be linked to the correct admission number.


PUBLIC SCHOOL PROFILE AND SEARCH ENGINE VISIBILITY
--------------------------------------------------
school-profile.html is a public, search-engine-friendly school information page.
The homepage and school profile include page titles, descriptions and social preview metadata.
robots.txt allows search engines to crawl public pages and disallows staff/admin portals.

IMPORTANT: Search engines cannot list this website until it is published on a public hosting
service with a working domain or public URL. Indexing is not immediate and cannot be guaranteed.
After the school confirms its official website address, create sitemap.xml using that exact
domain, add its Sitemap line to robots.txt, and submit the site in Google Search Console.
Do not add unverified phone numbers, postal addresses, exam results or school claims.
