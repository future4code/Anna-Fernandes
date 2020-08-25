const operation: string = process.argv[2];
const firstNumber: number = Number(process.argv[3]);
const secondNumber: number = Number(process.argv[4]);

const result = () => {
    switch(operation){
	case "add":
		return firstNumber + secondNumber;
	case "sub":
		return firstNumber - secondNumber;
	case "mult":
		return firstNumber * secondNumber;
	case "div":
		return firstNumber / secondNumber;
	default:
		return "Você deve escolher uma operação entre add, sub, mult e div"
    }
}

if(!operation && !firstNumber && !secondNumber) {
    console.log("Esperava 3 parâmetros mas não recebi nenhum :(")
} else if(!firstNumber && !secondNumber) {
	console.log("Esperava 3 parâmetros mas recebi apenas um :(")
} else {
	console.log('\x1b[35m%s\x1b[0m', result());
}
