// ── Salary Calculation Utilities ──

/** Calculate gross salary from salary components */
export const calculateGrossSalary = (salary) => {
    if (!salary) return 0;
    return (salary.basic || 0) + (salary.hra || 0) + (salary.da || 0) + (salary.medical || 0);
};

/** Calculate total deductions */
export const calculateDeductions = (salary) => {
    if (!salary) return 0;
    return (salary.pfDeduction || 0) + (salary.taxDeduction || 0);
};

/** Calculate net salary (take-home) */
export const calculateNetSalary = (salary) => {
    return calculateGrossSalary(salary) - calculateDeductions(salary);
};

/** Format currency in Indian Rupees */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "₹0";
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
};

/** Get salary breakdown as array for display */
export const getSalaryBreakdown = (salary) => {
    if (!salary) return [];
    return [
        { label: "Basic Pay", amount: salary.basic || 0, type: "earning" },
        { label: "HRA", amount: salary.hra || 0, type: "earning" },
        { label: "DA", amount: salary.da || 0, type: "earning" },
        { label: "Medical", amount: salary.medical || 0, type: "earning" },
        { label: "PF Deduction", amount: salary.pfDeduction || 0, type: "deduction" },
        { label: "Tax Deduction", amount: salary.taxDeduction || 0, type: "deduction" },
    ];
};
