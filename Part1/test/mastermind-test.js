//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected
const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Travel Mastermind Test", function () {
    this.timeout(100000000);

    it("should get within 6 tries", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        let witness;

        const INPUT = {
            "pubGuessA": "5",
            "pubGuessB": "4",
            "pubGuessC": "3",
            "pubGuessD": "2",
            "nTries":"6",
            "pubNumHit": "4",
            "pubNumBlow": "0",
            "pubSolnHash": "13630663015064836160108906220859308498479326522620485278897182547087795876906",
            "privSolnA": "5",
            "privSolnB": "4",
            "privSolnC": "3",
            "privSolnD": "2",
            "privSalt": "12354"
        }

        witness = await circuit.calculateWitness(INPUT, true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
    });

    it("exceeded 6 tries", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        let witness;

        const INPUT = {
            "pubGuessA": "5",
            "pubGuessB": "4",
            "pubGuessC": "3",
            "pubGuessD": "8",
            "nTries":"7",
            "pubNumHit": "4",
            "pubNumBlow": "0",
            "pubSolnHash": "13630663015064836160108906220859308498479326522620485278897182547087795876906",
            "privSolnA": "5",
            "privSolnB": "4",
            "privSolnC": "3",
            "privSolnD": "8",
            "privSalt": "12354"
        }

        witness = await circuit.calculateWitness(INPUT, true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
    });


    it("breaker makes first guess, 0 hit, 0 blows", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        let witness;

        const INPUT = {
            "pubGuessA": "5",
            "pubGuessB": "6",
            "pubGuessC": "7",
            "pubGuessD": "8",
            "nTries":"1",
            "pubNumHit": "0",
            "pubNumBlow": "0",
            "pubSolnHash": "8666566707692230148072482260257892163318649430061271843552036973556542702624",
            "privSolnA": "1",
            "privSolnB": "2",
            "privSolnC": "3",
            "privSolnD": "4",
            "privSalt": "12354"
        }

        witness = await circuit.calculateWitness(INPUT, true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
    });

    it("breaker makes guess, 2 hit, 0 blows", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        let witness;

        const INPUT = {
            "pubGuessA": "1",
            "pubGuessB": "2",
            "pubGuessC": "7",
            "pubGuessD": "8",
            "nTries":"6",
            "pubNumHit": "2",
            "pubNumBlow": "0",
            "pubSolnHash": "8666566707692230148072482260257892163318649430061271843552036973556542702624",
            "privSolnA": "1",
            "privSolnB": "2",
            "privSolnC": "3",
            "privSolnD": "4",
            "privSalt": "12354"
        }

        witness = await circuit.calculateWitness(INPUT, true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
    });

    it("breaker makes guess, 2 hit, 2 blows", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        let witness;

        const INPUT = {
            "pubGuessA": "1",
            "pubGuessB": "2",
            "pubGuessC": "4",
            "pubGuessD": "3",
            "nTries":"6",
            "pubNumHit": "2",
            "pubNumBlow": "2",
            "pubSolnHash": "8666566707692230148072482260257892163318649430061271843552036973556542702624",
            "privSolnA": "1",
            "privSolnB": "2",
            "privSolnC": "3",
            "privSolnD": "4",
            "privSalt": "12354"
        }

        witness = await circuit.calculateWitness(INPUT, true);
        assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
    });
});