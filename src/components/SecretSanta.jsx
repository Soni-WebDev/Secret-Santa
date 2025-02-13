import React, { useRef, useState } from "react";
import * as Papa from "papaparse";

const SecretSanta = () => {
    const [employees, setEmployees] = useState([]);
    const [previousAssignments, setPreviousAssignments] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const employeeFileRef = useRef(null);
    const previousAssignmentsFileRef = useRef(null);

    const handleFileUpload = (e, setData) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                let data = result.data.slice(1).map(row => ({
                    name: row[0]?.trim() || null,
                    email: row[1]?.trim() || null,
                    secretChildName: row[2]?.trim() || null,
                    secretChildEmail: row[3]?.trim() || null,
                }));

                // Remove last entry if it's empty
                if (data.length > 0) {
                    let lastEntry = data[data.length - 1];
                    if (!lastEntry.name || !lastEntry.email) {
                        data.pop();
                    }
                }

                setData(data);
            },
            header: false,
            skipEmptyLines: true, // Automatically removes empty rows
        });
    };

    const assignSecretSanta = () => {
        if (employees.length < 2) {
            alert("You need at least two employees to run Secret Santa.");
            return;
        }
        let shuffled = [...employees].sort(() => Math.random() - 0.5);
        let newAssignments = [];
        let assignedEmails = new Set();

        for (let i = 0; i < employees.length; i++) {
            let employee = employees[i];

            // Get valid choices excluding self and previous assignments
            let validChoices = shuffled.filter(
                (child) =>
                    child.email !== employee.email &&
                    !assignedEmails.has(child.email) &&
                    !previousAssignments.some(
                        (prev) =>
                            prev.email === employee.email &&
                            prev.secretChildEmail === child.email
                    )
            );

            if (validChoices.length === 0) {
                alert("Failed to generate unique assignments. Try again.");
                return;
            }

            let assignedChild = validChoices[0]; // Pick the first available valid choice
            newAssignments.push({
                ...employee,
                secretChildName: assignedChild.name,
                secretChildEmail: assignedChild.email,
            });

            assignedEmails.add(assignedChild.email);
            shuffled = shuffled.filter((c) => c.email !== assignedChild.email);
        }

        setAssignments(newAssignments);
    };


    const downloadCSV = () => {
        const csv = Papa.unparse(assignments);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "SecretSantaAssignments.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const resetInput = () => {
        employees && setEmployees([]);
        previousAssignments && setPreviousAssignments([]);
        assignments && setAssignments([]);

        // Clear file input fields
        if (employeeFileRef.current) employeeFileRef.current.value = "";
        if (previousAssignmentsFileRef.current) previousAssignmentsFileRef.current.value = "";
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold text-red-500 mb-6">🎅 Secret Santa Assignment 🎁</h2>

            {/* Upload Buttons */}
            <div className="mb-4 flex gap-4">
                <input
                    type="file" accept=".csv"
                    onChange={(e) => handleFileUpload(e, setEmployees)}
                    className="p-2 border rounded bg-white shadow"
                    ref={employeeFileRef}
                />
                <input
                    type="file" accept=".csv"
                    onChange={(e) => handleFileUpload(e, setPreviousAssignments)}
                    className="p-2 border rounded bg-white shadow"
                    ref={previousAssignmentsFileRef}
                />
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex gap-4">
                <button
                    onClick={assignSecretSanta}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
                >
                    Generate Assignments
                </button>
                <button
                    onClick={downloadCSV}
                    disabled={!assignments.length}
                    className={`px-4 py-2 font-semibold rounded transition ${assignments.length ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                >
                    Download CSV
                </button>
                <button
                    onClick={resetInput}
                    disabled={!assignments.length}
                    className={`px-4 py-2 font-semibold rounded transition ${assignments.length ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                >
                    Reset
                </button>
            </div>

            {/* Assignment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
                {assignments.map((entry, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-red-500">
                        <p className="text-lg font-semibold">{entry.name} 🎅</p>
                        <p className="text-sm text-gray-500">{entry.email}</p>
                        <hr className="my-2" />
                        <p className="text-md font-medium">Gives gift to:</p>
                        <p className="text-lg font-semibold text-red-500">{entry.secretChildName} 🎁</p>
                        <p className="text-sm text-gray-500">{entry.secretChildEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SecretSanta;
