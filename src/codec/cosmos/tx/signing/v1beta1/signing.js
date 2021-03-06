"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../../google/protobuf/any");
const multisig_1 = require("../../../../cosmos/crypto/multisig/v1beta1/multisig");
exports.protobufPackage = "cosmos.tx.signing.v1beta1";
/** SignMode represents a signing mode with its own security guarantees. */
var SignMode;
(function (SignMode) {
    /**
     * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     * rejected
     */
    SignMode[SignMode["SIGN_MODE_UNSPECIFIED"] = 0] = "SIGN_MODE_UNSPECIFIED";
    /**
     * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     * verified with raw bytes from Tx
     */
    SignMode[SignMode["SIGN_MODE_DIRECT"] = 1] = "SIGN_MODE_DIRECT";
    /**
     * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     * human-readable textual representation on top of the binary representation
     * from SIGN_MODE_DIRECT
     */
    SignMode[SignMode["SIGN_MODE_TEXTUAL"] = 2] = "SIGN_MODE_TEXTUAL";
    /**
     * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     * Amino JSON and will be removed in the future
     */
    SignMode[SignMode["SIGN_MODE_LEGACY_AMINO_JSON"] = 127] = "SIGN_MODE_LEGACY_AMINO_JSON";
    SignMode[SignMode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SignMode = exports.SignMode || (exports.SignMode = {}));
function signModeFromJSON(object) {
    switch (object) {
        case 0:
        case "SIGN_MODE_UNSPECIFIED":
            return SignMode.SIGN_MODE_UNSPECIFIED;
        case 1:
        case "SIGN_MODE_DIRECT":
            return SignMode.SIGN_MODE_DIRECT;
        case 2:
        case "SIGN_MODE_TEXTUAL":
            return SignMode.SIGN_MODE_TEXTUAL;
        case 127:
        case "SIGN_MODE_LEGACY_AMINO_JSON":
            return SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SignMode.UNRECOGNIZED;
    }
}
exports.signModeFromJSON = signModeFromJSON;
function signModeToJSON(object) {
    switch (object) {
        case SignMode.SIGN_MODE_UNSPECIFIED:
            return "SIGN_MODE_UNSPECIFIED";
        case SignMode.SIGN_MODE_DIRECT:
            return "SIGN_MODE_DIRECT";
        case SignMode.SIGN_MODE_TEXTUAL:
            return "SIGN_MODE_TEXTUAL";
        case SignMode.SIGN_MODE_LEGACY_AMINO_JSON:
            return "SIGN_MODE_LEGACY_AMINO_JSON";
        default:
            return "UNKNOWN";
    }
}
exports.signModeToJSON = signModeToJSON;
const baseSignatureDescriptors = {};
exports.SignatureDescriptors = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.signatures) {
            exports.SignatureDescriptor.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignatureDescriptors);
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signatures.push(exports.SignatureDescriptor.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSignatureDescriptors);
        message.signatures = [];
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(exports.SignatureDescriptor.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => e ? exports.SignatureDescriptor.toJSON(e) : undefined);
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignatureDescriptors);
        message.signatures = [];
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(exports.SignatureDescriptor.fromPartial(e));
            }
        }
        return message;
    },
};
const baseSignatureDescriptor = { sequence: long_1.default.UZERO };
exports.SignatureDescriptor = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.publicKey !== undefined) {
            any_1.Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.data !== undefined) {
            exports.SignatureDescriptor_Data.encode(message.data, writer.uint32(18).fork()).ldelim();
        }
        if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignatureDescriptor);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.publicKey = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.data = exports.SignatureDescriptor_Data.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.sequence = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSignatureDescriptor);
        if (object.publicKey !== undefined && object.publicKey !== null) {
            message.publicKey = any_1.Any.fromJSON(object.publicKey);
        }
        else {
            message.publicKey = undefined;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = exports.SignatureDescriptor_Data.fromJSON(object.data);
        }
        else {
            message.data = undefined;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = long_1.default.fromString(object.sequence);
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.publicKey !== undefined &&
            (obj.publicKey = message.publicKey
                ? any_1.Any.toJSON(message.publicKey)
                : undefined);
        message.data !== undefined &&
            (obj.data = message.data
                ? exports.SignatureDescriptor_Data.toJSON(message.data)
                : undefined);
        message.sequence !== undefined &&
            (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignatureDescriptor);
        if (object.publicKey !== undefined && object.publicKey !== null) {
            message.publicKey = any_1.Any.fromPartial(object.publicKey);
        }
        else {
            message.publicKey = undefined;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = exports.SignatureDescriptor_Data.fromPartial(object.data);
        }
        else {
            message.data = undefined;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = long_1.default.UZERO;
        }
        return message;
    },
};
const baseSignatureDescriptor_Data = {};
exports.SignatureDescriptor_Data = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.single !== undefined) {
            exports.SignatureDescriptor_Data_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            exports.SignatureDescriptor_Data_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignatureDescriptor_Data);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.single = exports.SignatureDescriptor_Data_Single.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.multi = exports.SignatureDescriptor_Data_Multi.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSignatureDescriptor_Data);
        if (object.single !== undefined && object.single !== null) {
            message.single = exports.SignatureDescriptor_Data_Single.fromJSON(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = exports.SignatureDescriptor_Data_Multi.fromJSON(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.single !== undefined &&
            (obj.single = message.single
                ? exports.SignatureDescriptor_Data_Single.toJSON(message.single)
                : undefined);
        message.multi !== undefined &&
            (obj.multi = message.multi
                ? exports.SignatureDescriptor_Data_Multi.toJSON(message.multi)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignatureDescriptor_Data);
        if (object.single !== undefined && object.single !== null) {
            message.single = exports.SignatureDescriptor_Data_Single.fromPartial(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = exports.SignatureDescriptor_Data_Multi.fromPartial(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
};
const baseSignatureDescriptor_Data_Single = { mode: 0 };
exports.SignatureDescriptor_Data_Single = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        if (message.signature.length !== 0) {
            writer.uint32(18).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignatureDescriptor_Data_Single);
        message.signature = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mode = reader.int32();
                    break;
                case 2:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSignatureDescriptor_Data_Single);
        message.signature = new Uint8Array();
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = signModeFromJSON(object.mode);
        }
        else {
            message.mode = 0;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = bytesFromBase64(object.signature);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
        message.signature !== undefined &&
            (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignatureDescriptor_Data_Single);
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = 0;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = object.signature;
        }
        else {
            message.signature = new Uint8Array();
        }
        return message;
    },
};
const baseSignatureDescriptor_Data_Multi = {};
exports.SignatureDescriptor_Data_Multi = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.bitarray !== undefined) {
            multisig_1.CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.signatures) {
            exports.SignatureDescriptor_Data.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignatureDescriptor_Data_Multi);
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bitarray = multisig_1.CompactBitArray.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signatures.push(exports.SignatureDescriptor_Data.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSignatureDescriptor_Data_Multi);
        message.signatures = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = multisig_1.CompactBitArray.fromJSON(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(exports.SignatureDescriptor_Data.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bitarray !== undefined &&
            (obj.bitarray = message.bitarray
                ? multisig_1.CompactBitArray.toJSON(message.bitarray)
                : undefined);
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => e ? exports.SignatureDescriptor_Data.toJSON(e) : undefined);
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignatureDescriptor_Data_Multi);
        message.signatures = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = multisig_1.CompactBitArray.fromPartial(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(exports.SignatureDescriptor_Data.fromPartial(e));
            }
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
