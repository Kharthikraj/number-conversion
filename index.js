class NumConvtr {
  constructor(firstsel, secsel, firstinp, secinp) {
    this.firstsel = firstsel.value;
    this.secsel = secsel.value;
    this.firstinp = firstinp.value;
    this.secinp = secinp.value;
  }
  selector() {
    if (this.firstsel === "Binary") {
      switch (this.secsel) {
        case "Octal":
          this.binaryToOctal(this.firstinp);
          break;
        case "Decimal":
          this.binaryToDecimal(this.firstinp);
          break;
        case "Hexadecimal":
          this.binaryToHexadecimal(this.firstinp);
          break;
        default:
          let x = "samesel";
          this.errors(x);
      }
    } else if (this.firstsel === "Octal") {
      switch (this.secsel) {
        case "Binary":
          this.octalToBinary(this.firstinp);
          break;
        case "Decimal":
          this.octalToDecimal(this.firstinp);
          break;
        case "Hexadecimal":
          this.octalToHexadecimal(this.firstinp);
          break;
        default:
          let x = "samesel";
          this.errors(x);
      }
    } else if (this.firstsel === "Decimal") {
      switch (this.secsel) {
        case "Binary":
          this.decimalToBinary(this.firstinp);
          break;
        case "Octal":
          this.decimalToOctal(this.firstinp);
          break;
        case "Hexadecimal":
          this.decimalToHexadecimal(this.firstinp);
          break;
        default:
          let x = "samesel";
          this.errors(x);
      }
    } else if (this.firstsel === "Hexadecimal") {
      switch (this.secsel) {
        case "Binary":
          this.hexadecimalToBinary(this.firstinp);
          break;
        case "Octal":
          this.hexadecimalToOctal(this.firstinp);
          break;
        case "Decimal":
          this.hexadecimalToDecimal(this.firstinp);
          break;
        default:
          let x = "samesel";
          this.errors(x);
      }
    }
  }

  // binary to...
  binaryToOctal(x) {
    let result = Array();
    let lis = Array();
    let str_x = String(Number(x));
    let len_x = str_x.length;
    let rem = len_x % 3;

    if (rem !== 0) {
      len_x += 3 - rem;
    }

    str_x = str_x.padStart(len_x, "0");

    for (let i = 0; i < len_x; i = i + 3) {
      lis.push(str_x.slice(i, i + 3));
    }

    // new for loop for single iteration
    for (let a of lis) {
      let temp = 0;
      for (let b = 0; b < 3; b++) {
        if (b === 0) {
          temp += Number(a[b]) * 4;
        } else if (b === 1) {
          temp += Number(a[b]) * 2;
        } else {
          temp += Number(a[b]) * 1;
        }
      }
      result.push(String(temp));
    }
    let final_result = result.join("");
    inputTwo.value = final_result;
    return final_result;
  }

  binaryToDecimal(x) {
    let result = 0,
      len = x.length;
    for (let i = len - 1; i >= 0; i--) {
      result += Number(this.rev(x).charAt(i)) * 2 ** i;
    }
    inputTwo.value = result;
  }

  binaryToHexadecimal(x) {
    let str_x = String(Number(x));
    let len_x = str_x.length;
    let rem = len_x % 4;
    let lis = Array();
    let result_hex = Array();
    let final_result = "";

    if (rem !== 0) {
      len_x += 4 - rem;
    }

    str_x = str_x.padStart(len_x, "0");
    for (let i = 0; i < len_x; i = i + 4) {
      lis.push(str_x.slice(i, i + 4));
    }

    for (let a of lis) {
      let temp = 0;
      for (let b = 0; b < 4; b++) {
        if (b === 0) {
          temp += Number(a[b]) * 8;
        } else if (b === 1) {
          temp += Number(a[b]) * 4;
        } else if (b === 2) {
          temp += Number(a[b]) * 2;
        } else {
          temp += Number(a[b]) * 1;
        }
      }
      let str_temp = String(temp);
      result_hex.push(str_temp);
    }

    for (let i of result_hex) {
      let int_i = Number(i);
      if (int_i > 9) {
        int_i = int_i + 55;
        final_result += String.fromCharCode(int_i);
      } else {
        final_result += i;
      }
    }

    inputTwo.value = final_result;
    return final_result;
  }

  // octal to...
  octalToBinary(x) {
    let deci = this.octalToDecimal(x);
    let bina = this.decimalToBinary(deci);
    inputTwo.value = bina;
    return bina;
  }

  octalToDecimal(x) {
    let result = 0;
    let rev_str = this.rev(String(x));
    let length = rev_str.length;
    for (let i = 0; i < length; i++) {
      result += Number(rev_str.charAt(i)) * 8 ** i;
    }
    let ret = String(result);
    inputTwo.value = ret;
    return ret;
  }

  octalToHexadecimal(x) {
    let bina = this.octalToBinary(x);
    let hexad = this.binaryToHexadecimal(bina);
    inputTwo.value = hexad;
    return hexad;
  }

  // decimal to...
  decimalToBinary(x) {
    let revres = "",
      dup = parseInt(x);
    if (dup !== 0) {
      while (dup !== 0) {
        revres += String(dup % 2);
        dup = parseInt(dup / 2);
      }
    } else {
      revres = "0";
    }
    // padStart to pad with zeros
    let lent = revres.length;
    let mod = lent % 4;
    let pad = lent;
    if (mod !== 0) {
      pad = lent + (4 - mod);
    }

    let ret = this.rev(revres).padStart(pad, "0");
    inputTwo.value = ret;
    return ret;
  }

  decimalToOctal(x) {
    let final_result = this.binaryToOctal(this.decimalToBinary(x));
    inputTwo.value = final_result;
    return final_result;
  }

  decimalToHexadecimal(x) {
    let result = this.binaryToHexadecimal(this.decimalToBinary(x));
    inputTwo.value = result;
    return result;
  }

  // hexadecimal to...
  hexadecimalToBinary(x) {
    let result = this.decimalToBinary(this.hexadecimalToDecimal(x));
    inputTwo.value = result;
    return result;
  }
  hexadecimalToOctal(x) {
    let result = this.decimalToOctal(this.hexadecimalToDecimal(x));
    inputTwo.value = result;
    return result;
  }

  hexadecimalToDecimal(x) {
    let result = 0;
    let lis_x = x.split("");
    let lis_one = Array();

    for (let a of lis_x) {
      if (48 <= a.charCodeAt(0) && a.charCodeAt(0) < 58) {
        lis_one.push(a);
      } else {
        let b = a.toUpperCase();
        let i = String(b.charCodeAt(0) - 55);
        lis_one.push(i);
      }
    }

    lis_one.reverse();

    for (let c = 0; c < lis_one.length; c++) {
      result += Number(lis_one[c]) * 16 ** c;
    }

    inputTwo.value = result;
    return result;
  }

  // reverse func..
  rev(toberevd) {
    return toberevd.split("").reverse().join("");
  }

  // errors...
  errors(x) {
    if (x === "samesel") {
      alert(`Cannot convert ${this.firstsel} to ${this.firstsel}`);
    }
  }
}

let firstSelection = document.querySelector(".select-one");
let secondSelection = document.querySelector(".select-two");
let swapButton = document.querySelector(".swap-button");
let calculate = document.querySelector(".calculate-button");
let inputOne = document.querySelector(".input-one");
let inputTwo = document.querySelector(".input-two");

calculate.onclick = function () {
  const inputs = new NumConvtr(
    firstSelection,
    secondSelection,
    inputOne,
    inputTwo
  );
  inputs.selector();
};

// swap button...
swapButton.addEventListener("click", function () {
  if (firstSelection.value === secondSelection.value) {
    alert("Same values cannot be swapped");
  } else {
    let temp, valtemp;
    temp = secondSelection.value;
    secondSelection.value = firstSelection.value;
    firstSelection.value = temp;
    valtemp = inputTwo.value;
    inputTwo.value = inputOne.value;
    inputOne.value = valtemp;
  }
});
