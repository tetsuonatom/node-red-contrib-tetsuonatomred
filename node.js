module.exports = function(RED) {
    function PikihikibikiNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            const piki = 'ぴき (Piki)';
            const hiki = 'ひき (Hiki)';
            const biki = 'びき (Biki)';
            const nonNaturalNumberError = ' must be a non-natural number. Input a natural number to count :)';
            let numeralClassifier = hiki;
            let inputStrNum = '0';
            let strnum = '0';

            inputStrNum = msg.payload.toString();

            // Retrieve ones digit
            if (Number(inputStrNum) > 9) {
                strnum = inputStrNum.substring(inputStrNum.length - 1, inputStrNum.length);
            } else {
                strnum = inputStrNum;
            }

            // Ones digit is 0
            if (strnum == '0') {
                // Input number is 0
                if (Number(inputStrNum) == 0) {
                    numeralClassifier = hiki;
                // Tens digit is 1 - 9
                } else if (inputStrNum.substring(inputStrNum.length - 2, inputStrNum.length - 1) != '0') {
                    numeralClassifier = piki;
                // Hundreds digit is 1 - 9
                } else if (Number(inputStrNum) >= 100 && (inputStrNum.substring(inputStrNum.length - 3, inputStrNum.length - 2) != '0')) { 
                    numeralClassifier = piki;
                } else {
                    numeralClassifier = biki;
                }
            // Ones digit is 1, 6 or 8
            } else if (strnum == '1' || strnum == '6' || strnum == '8') {
                numeralClassifier = piki;
            // Ones digit is 2, 4, 5, 7 or 9 
            } else if (strnum == '2' || strnum == '4' || strnum == '5' || strnum == '7' || strnum == '9') {
                numeralClassifier = hiki;
            // Ones digit is 3
            } else if (strnum == '3') {
                numeralClassifier = biki;
            // A non-natural number must be come.
            } else {
                numeralClassifier = nonNaturalNumberError;
            }

            msg.payload = inputStrNum + numeralClassifier;

            node.send(msg);
        });
    }
    RED.nodes.registerType("pikihikibiki-node",PikihikibikiNode);
}