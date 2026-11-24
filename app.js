/**
 * KAWA ACADEMY PRIMARY SCHOOL - COMPLETE SYSTEM LOGIC (app.js)
 * Security: SHA-256 Password Hashing via Web Crypto API (No plain-text passwords)
 */
document.addEventListener("DOMContentLoaded", () => {

    // 1. SHA-256 HASHING FUNCTION
    async function hashPassword(plainText) {
        const encoder = new TextEncoder();
        const data = encoder.encode(plainText);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // 2. HASHED ACCOUNT CREDENTIALS (NO PLAIN TEXT)
    const ACCOUNTS = {
        pupils: {
            "KA-2026-001": {
                hash: "fefbbcdd5ae4f77f1c988142c62f43591ca2b8cc091535120c4e4f013f3586c2",
                name: "Amina Namukasa",
                classLevel: "Primary Six (P.6)"
            },
            "KA-2026-002": {
                hash: "0f5c88b69e019e66f1d6636c9a1829528c731e66985a32d28cb0a5a6d052beaf",
                name: "David Mukasa",
                classLevel: "Primary Four (P.4)"
            }
        },
        staff: {
            "STF-101": {
                hash: "10176e7b7b24d317acfcf8d2064cfd2f24e154f7b5a96603077d5ef813d6a6b6",
                name: "Tr. John Bosco",
                subject: "Mathematics & Science"
            },
            "STF-102": {
                hash: "8f5dada329d6ade1fdba5e207b5a81b312ae838801ca287a00e9428620808dce",
                name: "Tr. Sarah Nakato",
                subject: "English & Literacy"
            }
        },
        dos: {
            "DOS-KAWA-01": {
                hash: "27f74d2fe20fe3f32dcf8b7d8c4bd90e775172400393fde5707677230e2a7428",
                name: "Director of Studies (DOS)"
            }
        },
        headteacher: {
            "HTR-KAWA-01": {
                hash: "68e31b57cf1f797729c8ab467ce8e26e2e02589b5a549705d875f5beb6edfc0c",
                name: "Head Teacher - Kawa Academy"
            }
        },
        directors: {
            "DIR-001": {
                hash: "9f5a5f97ba252ffcf5a4cb773a943fcb5e7ffe957a17b8646c7c81e6beaf1fab",
                role: "Chairperson",
                name: "Chairperson of the Board"
            },
            "DIR-002": {
                hash: "431fbc319a149dd2e970716c6d43de42afc92d1ae69f4772899eef490a2b07ff",
                role: "Director of Finance",
                name: "Director of Finance & Admin"
            },
            "DIR-003": {
                hash: "a9caa3643e136cb12f5ab8e5659c4d8d2e27d99b5b6ecae967cc8419c5c63268",
                role: "Director of Academics",
                name: "Director of Academics & Welfare"
            },
            "DIR-004": {
                hash: "8b8bdfd6ee38e63a10ee43ea62fac8e62d8b2501ec6e4370e4bad4c59e2d86e4",
                role: "Managing Director",
                name: "Managing Director"
            }
        }
    };

    // 3. STORAGE & UI HELPERS
    function getRecords(key) {
        return JSON.parse(localStorage.getItem(key) || "[]");
    }

    function saveRecord(key, item) {
        const records = getRecords(key);
        records.unshift(item);
        localStorage.setItem(key, JSON.stringify(records));
    }

    function showMessage(elementId, htmlText, isSuccess) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.innerHTML = htmlText;
        el.style.padding = "12px";
        el.style.borderRadius = "8px";
        el.style.marginTop = "14px";
        el.style.backgroundColor = isSuccess ? "#dcfce7" : "#fee2e2";
        el.style.color = isSuccess ? "#15803d" : "#b91c1c";
    }

    // 4. PRINTABLE ADMISSION SLIP FOR PARENTS
    window.printAdmissionSlip = function(appId) {
        const admissions = getRecords("kawa_admissions");
        const app = admissions.find(item => item.id === appId);
        if (!app) return;

        const slipWindow = window.open("", "_blank", "width=720,height=650");
        slipWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admission Slip - ${app.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 36px; color: #1e293b; }
                    .slip-box { border: 2px solid #102a43; border-radius: 10px; padding: 28px; max-width: 600px; margin: auto; }
                    .header { text-align: center; border-bottom: 2px solid #d97706; padding-bottom: 14px; margin-bottom: 20px; }
                    .header h1 { margin: 0; color: #102a43; font-size: 22px; }
                    .row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px dashed #cbd5e1; }
                    .label { font-weight: bold; color: #102a43; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <div class="slip-box">
                    <div class="header">
                        <h1>KAWA ACADEMY PRIMARY SCHOOL</h1>
                        <p>Official Pupil Vacancy Application Slip (Nursery – P.7)</p>
                    </div>
                    <div class="row"><span class="label">Reference:</span><span>${app.id}</span></div>
                    <div class="row"><span class="label">Child's Name:</span><span>${app.childName}</span></div>
                    <div class="row"><span class="label">Class:</span><span>${app.childClass}</span></div>
                    <div class="row"><span class="label">Age:</span><span>${app.childAge} Years</span></div>
                    <div class="row"><span class="label">Parent:</span><span>${app.parentName}</span></div>
                    <div class="row"><span class="label">Phone:</span><span>${app.parentPhone}</span></div>
                    <div class="row"><span class="label">Date:</span><span>${app.date}</span></div>
                    <div style="text-align:center; margin-top:20px;" class="no-print">
                        <button onclick="window.print()" style="background:#102a43; color:#fff; border:none; padding:10px 20px; border-radius:6px; cursor:pointer;">Print Slip</button>
                    </div>
                </div>
            </body>
            </html>
        `);
        slipWindow.document.close();
    };
        // 5. PUPIL LOGIN & PARENT VACANCY APPLICATION
    const pupilLoginForm = document.getElementById("pupilLoginForm");
    if (pupilLoginForm) {
        pupilLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("pupilId").value.trim().toUpperCase();
            const enteredHash = await hashPassword(document.getElementById("pupilPass").value);
            const pupil = ACCOUNTS.pupils[id];

            if (pupil && pupil.hash === enteredHash) {
                const container = pupilLoginForm.closest(".card");
                container.innerHTML = `
                    <span class="role-badge gold">Pupil Portal</span>
                    <h2>Welcome, ${pupil.name}</h2>
                    <p class="subtitle">Admission No: ${id} | Class: ${pupil.classLevel}</p>
                    <ul style="margin-left:20px; line-height:1.9;">
                        <li><strong>Mathematics:</strong> 88% (D1)</li>
                        <li><strong>English Language:</strong> 84% (D2)</li>
                        <li><strong>Integrated Science:</strong> 90% (D1)</li>
                        <li><strong>Social Studies (SST):</strong> 81% (D2)</li>
                    </ul>
                    <button onclick="location.reload()" class="btn-secondary" style="margin-top:16px;">Sign Out</button>
                `;
            } else {
                alert("Invalid Pupil Admission Number or Password.");
            }
        });
    }

    const childAdmissionForm = document.getElementById("childAdmissionForm");
    if (childAdmissionForm) {
        childAdmissionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const application = {
                id: "ADM-" + Math.floor(1000 + Math.random() * 9000),
                childName: document.getElementById("childName").value.trim(),
                childClass: document.getElementById("childClass").value,
                childAge: document.getElementById("childAge").value,
                parentName: document.getElementById("parentName").value.trim(),
                parentPhone: document.getElementById("parentPhone").value.trim(),
                status: "Pending",
                date: new Date().toLocaleDateString()
            };

            saveRecord("kawa_admissions", application);
            showMessage(
                "admissionFeedback",
                `Application submitted for <strong>${application.childName}</strong> (${application.childClass}). Ref: <strong>${application.id}</strong><br><br>
                <button type="button" onclick="printAdmissionSlip('${application.id}')" class="btn-primary" style="padding:8px 14px; font-size:0.88rem;">Print Admission Slip</button>`,
                true
            );
            childAdmissionForm.reset();
        });
    }

    // 6. STAFF PORTAL & APPLICATIONS
    const staffLoginForm = document.getElementById("staffLoginForm");
    if (staffLoginForm) {
        staffLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("staffId").value.trim().toUpperCase();
            const enteredHash = await hashPassword(document.getElementById("staffPass").value);
            const staffMember = ACCOUNTS.staff[id];

            if (staffMember && staffMember.hash === enteredHash) {
                const container = staffLoginForm.closest(".card");
                container.innerHTML = `
                    <span class="role-badge">Staff Room</span>
                    <h2>Welcome, ${staffMember.name}</h2>
                    <p class="subtitle">Staff ID: ${id} | ${staffMember.subject}</p>
                    <p>Use the <strong>Internal Staff Request</strong> form next to this panel to send leave, welfare, or classroom requests directly to the Head Teacher and Board of Directors.</p>
                    <button onclick="location.reload()" class="btn-secondary" style="margin-top:16px;">Sign Out</button>
                `;
            } else {
                alert("Invalid Staff ID or Password.");
            }
        });
    }

    const internalRequestForm = document.getElementById("internalRequestForm");
    if (internalRequestForm) {
        internalRequestForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const request = {
                id: "REQ-" + Math.floor(100 + Math.random() * 900),
                teacherName: document.getElementById("currentTeacherName").value.trim(),
                type: document.getElementById("requestType").value,
                details: document.getElementById("requestDetails").value.trim(),
                status: "Pending",
                date: new Date().toLocaleDateString()
            };

            saveRecord("kawa_staff_requests", request);
            showMessage("internalFeedback", `Request <strong>#${request.id}</strong> sent confidentially to the Head Teacher and Board of Directors.`, true);
            internalRequestForm.reset();
        });
    }

    const teacherJobForm = document.getElementById("teacherJobForm");
    if (teacherJobForm) {
        teacherJobForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const jobApp = {
                id: "JOB-" + Math.floor(100 + Math.random() * 900),
                name: document.getElementById("applicantName").value.trim(),
                phone: document.getElementById("applicantPhone").value.trim(),
                qualification: document.getElementById("qualification").value,
                specialty: document.getElementById("subjectSpecialty").value.trim(),
                status: "Pending",
                date: new Date().toLocaleDateString()
            };

            saveRecord("kawa_job_apps", jobApp);
            showMessage("jobFeedback", `Thank you, <strong>${jobApp.name}</strong>! Teaching application <strong>#${jobApp.id}</strong> has been submitted.`, true);
            teacherJobForm.reset();
        });
    }

        // 7. DOS, HEAD TEACHER & DIRECTORS LOGIN REDIRECTS
    const dosLoginForm = document.getElementById("dosLoginForm");
    if (dosLoginForm) {
        dosLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("dosUsername").value.trim().toUpperCase();
            const enteredHash = await hashPassword(document.getElementById("dosPassword").value);
            const dosUser = ACCOUNTS.dos[id];

            if (dosUser && dosUser.hash === enteredHash) {
                sessionStorage.setItem("kawa_active_role", "DOS");
                sessionStorage.setItem("kawa_active_name", dosUser.name);
                window.location.href = "admin-dashboard.html";
            } else {
                showMessage("dosFeedback", "Invalid DOS ID or Password.", false);
            }
        });
    }

    const htrLoginForm = document.getElementById("htrLoginForm");
    if (htrLoginForm) {
        htrLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("htrUsername").value.trim().toUpperCase();
            const enteredHash = await hashPassword(document.getElementById("htrPassword").value);
            const htrUser = ACCOUNTS.headteacher[id];

            if (htrUser && htrUser.hash === enteredHash) {
                sessionStorage.setItem("kawa_active_role", "HTR");
                sessionStorage.setItem("kawa_active_name", htrUser.name);
                window.location.href = "admin-dashboard.html";
            } else {
                showMessage("htrFeedback", "Invalid Head Teacher Credentials.", false);
            }
        });
    }

    const directorLoginForm = document.getElementById("directorLoginForm");
    if (directorLoginForm) {
        directorLoginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const selectedRole = document.getElementById("directorRole").value;
            const id = document.getElementById("directorCode").value.trim().toUpperCase();
            const enteredHash = await hashPassword(document.getElementById("directorPass").value);
            const director = ACCOUNTS.directors[id];

            if (director && director.hash === enteredHash && director.role === selectedRole) {
                sessionStorage.setItem("kawa_active_role", "DIRECTOR");
                sessionStorage.setItem("kawa_active_name", `${director.name} (${id})`);
                window.location.href = "admin-dashboard.html";
            } else {
                showMessage("directorFeedback", "Invalid Director Seat, Personal ID, or Passcode.", false);
            }
        });
    }

    // 8. ADMIN DASHBOARD RENDERING & STRICT ACCESS CONTROL
    const dashWelcomeTitle = document.getElementById("dashWelcomeTitle");
    if (dashWelcomeTitle) {
        const activeRole = sessionStorage.getItem("kawa_active_role");
        const activeName = sessionStorage.getItem("kawa_active_name");

        if (!activeRole) {
            window.location.href = "index.html";
            return;
        }

        dashWelcomeTitle.textContent = `Welcome, ${activeName}`;
        const isExecutive = (activeRole === "HTR" || activeRole === "DIRECTOR");

        if (activeRole === "DOS") {
            document.getElementById("dashBadge").textContent = "Academic Access (DOS)";
            document.getElementById("dashScopeNote").textContent = "Viewing pupil placement records. Staff recruitment and internal teacher requests are restricted.";
            document.querySelectorAll(".exec-only-col").forEach(el => el.style.display = "none");
        } else {
            document.getElementById("dashBadge").textContent = activeRole === "HTR" ? "Head Teacher Executive Access" : "Board of Directors Access";
            document.getElementById("dashScopeNote").textContent = "Full access to pupil admissions, teacher job applications, and internal staff requests.";
            document.getElementById("teacherJobsSection").classList.remove("hidden-section");
            document.getElementById("internalRequestsSection").classList.remove("hidden-section");
        }

        window.updateRecordStatus = function(storageKey, recordId, newStatus) {
            const list = getRecords(storageKey);
            const target = list.find(item => item.id === recordId);
            if (target) {
                target.status = newStatus;
                localStorage.setItem(storageKey, JSON.stringify(list));
                renderAllTables();
            }
        };

        function getStatusBadge(status) {
            if (status === "Approved") return `<span class="status-pill status-approved">Approved</span>`;
            if (status === "Declined") return `<span class="status-pill status-declined">Declined</span>`;
            return `<span class="status-pill status-pending">Pending</span>`;
        }

        function renderAllTables() {
            const admissions = getRecords("kawa_admissions");
            const admBody = document.getElementById("admissionsTableBody");
            admBody.innerHTML = admissions.length ? admissions.map(a => `
                <tr>
                    <td><strong>${a.id}</strong></td>
                    <td>${a.childName}</td>
                    <td>${a.childClass}</td>
                    <td>${a.childAge}</td>
                    <td>${a.parentName}</td>
                    <td>${a.parentPhone}</td>
                    <td>${a.date}</td>
                    <td>${getStatusBadge(a.status)}</td>
                    ${isExecutive ? `
                        <td>
                            <button class="action-btn btn-approve" onclick="updateRecordStatus('kawa_admissions', '${a.id}', 'Approved')">Approve</button>
                            <button class="action-btn btn-decline" onclick="updateRecordStatus('kawa_admissions', '${a.id}', 'Declined')">Decline</button>
                        </td>` : ""}
                </tr>
            `).join("") : `<tr><td colspan="${isExecutive ? 9 : 8}" style="text-align:center;">No pupil vacancy applications yet.</td></tr>`;

            if (isExecutive) {
                const jobs = getRecords("kawa_job_apps");
                const jobsBody = document.getElementById("jobsTableBody");
                jobsBody.innerHTML = jobs.length ? jobs.map(j => `
                    <tr>
                        <td><strong>${j.id}</strong></td>
                        <td>${j.name}</td>
                        <td>${j.qualification}</td>
                        <td>${j.specialty}</td>
                        <td>${j.phone}</td>
                        <td>${j.date}</td>
                        <td>${getStatusBadge(j.status)}</td>
                        <td>
                            <button class="action-btn btn-approve" onclick="updateRecordStatus('kawa_job_apps', '${j.id}', 'Approved')">Shortlist</button>
                            <button class="action-btn btn-decline" onclick="updateRecordStatus('kawa_job_apps', '${j.id}', 'Declined')">Decline</button>
                        </td>
                    </tr>
                `).join("") : `<tr><td colspan="8" style="text-align:center;">No external teacher applications yet.</td></tr>`;

                const requests = getRecords("kawa_staff_requests");
                const reqBody = document.getElementById("requestsTableBody");
                reqBody.innerHTML = requests.length ? requests.map(r => `
                    <tr>
                        <td><strong>${r.id}</strong></td>
                        <td>${r.teacherName}</td>
                        <td>${r.type}</td>
                        <td>${r.details}</td>
                        <td>${r.date}</td>
                        <td>${getStatusBadge(r.status)}</td>
                        <td>
                            <button class="action-btn btn-approve" onclick="updateRecordStatus('kawa_staff_requests', '${r.id}', 'Approved')">Approve</button>
                            <button class="action-btn btn-decline" onclick="updateRecordStatus('kawa_staff_requests', '${r.id}', 'Declined')">Decline</button>
                        </td>
                    </tr>
                `).join("") : `<tr><td colspan="7" style="text-align:center;">No internal staff requests submitted yet.</td></tr>`;
            }
        }

        renderAllTables();

        document.getElementById("logoutBtn").addEventListener("click", () => {
            sessionStorage.clear();
            window.location.href = "index.html";
        });
    }
});
