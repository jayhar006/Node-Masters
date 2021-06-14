const yargs = require('yargs').argv;


class Bank {
    constructor(loanAmount, interestRate){
        this.loanAmount = loanAmount;
        this.interestRate = interestRate;
    }

    getMonthlyInstallment(loanTerm){
        const interestAmount = (this.loanAmount * this.interestRate) * loanTerm;
        const monthlyAmort = (interestAmount + this.loanAmount) / loanTerm;
        return monthlyAmort;
    }
}

class Metrobank extends Bank {
    constructor(loanAmount){
        super(loanAmount, .015);
    }
}

class BPI extends Bank {
    constructor(loanAmount){
        super(loanAmount, .012);
    }
    
}

class BDO extends Bank {
    constructor(loanAmount){
        super(loanAmount, .017);
    }
}

class LoanCalculator {
    constructor(bankName, loanAmount, loanTerm){
        this.bankName = bankName;
        this.loanAmount = loanAmount;
        this.loanTerm = loanTerm;
    }

    getMonthlyInstallment(){
        var bank = new Bank();
        
        if (new String(this.bankName).valueOf() == new String("metrobank").valueOf()) {
            bank = new Metrobank(this.loanAmount);
        } else if (new String(this.bankName).valueOf() == new String("bpi").valueOf()) {
            bank = new BPI(this.loanAmount);
        } else if (new String(this.bankName).valueOf() == new String("bdo").valueOf()) {
            bank = new BDO(this.loanAmount);
        } else {
            console.log("Invalid bank details. Please check.")
        }
        return bank.getMonthlyInstallment(this.loanTerm);
    }
}

const loanCalulator = new LoanCalculator(yargs.bankName,yargs.loanAmount,yargs.loanTerm);
process.stdout.write("Your Monthly Installment is: ");
console.log(loanCalulator.getMonthlyInstallment());