document.getElementById('calculateButton').addEventListener('click', function() {
    // Get income details
    const annualIncome = parseFloat(document.getElementById('annualIncomeInput').value || 0);
    const incomeFrequency = parseInt(document.getElementById('annualIncomePeriod').value || 1);
    const rentalIncome = parseFloat(document.getElementById('rentalIncomeInput').value || 0);
    const rentalFrequency = parseInt(document.getElementById('rentalIncomePeriod').value || 1);
    const otherIncome = parseFloat(document.getElementById('otherIncomeInput').value || 0);
    const otherIncomeFrequency = parseInt(document.getElementById('otherIncomePeriod').value || 1);
    
    // Get expenses details
    const monthlyExpenses = parseFloat(document.getElementById('monthlyExpensesInput').value || 0);
    const rentAfterBuy = parseFloat(document.getElementById('rentInput').value || 0);
    const homeLoanRepayment = parseFloat(document.getElementById('home-loanInput').value || 0);
    const otherLoanRepayment = parseFloat(document.getElementById('other-loanInput').value || 0);
    const creditCardLimit = parseFloat(document.getElementById('creditCardlimitInput').value || 0);

    // Convert all income and expenses to an annual amount for consistency
    const annualIncomeTotal = annualIncome * incomeFrequency + rentalIncome * rentalFrequency + otherIncome * otherIncomeFrequency;
    const annualExpensesTotal = monthlyExpenses * 12 + rentAfterBuy * 12 + homeLoanRepayment * 12 + otherLoanRepayment * 12;

    // Basic formula for borrowing power (as an example; in practice, you might apply more complex rules or rates)
    const borrowingPower = (annualIncomeTotal - annualExpensesTotal) * 5; // multiplier for borrowing power

    // Update borrow amount on UI
    document.getElementById('borrowAmount').innerText = `$${borrowingPower.toLocaleString()}`;
    document.getElementById('borrowSlider').value = borrowingPower;
    document.querySelector('.slider-value').innerText = `$${borrowingPower.toLocaleString()}`;
    
    // Update repayment details - assuming a standard calculation for principal + interest over a loan term
    const loanTermYears = parseInt(document.getElementById('loanDuration').value);
    const interestRate = parseFloat(document.getElementById('loanRateType').value.match(/[\d.]+/)[0]); // Extract number from the rate text

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
    const monthlyRepayment = (borrowingPower * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    // Update repayment and loan details
    document.querySelector('.repayment-details p').innerText = `$${monthlyRepayment.toFixed(2)}`;
    document.getElementById('loan-details').querySelector('p').innerText = `Based on a ${interestRate}% p.a. rate over ${loanTermYears} years`;

});
