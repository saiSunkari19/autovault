/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Token } from '../../issuance/v1beta1/token';
import { PageRequest, PageResponse } from '../../cosmos/base/query/v1beta1/pagination';

export const protobufPackage = 'issuance.v1beta1';

/** this line is used by starport scaffolding # 3 */
export interface QueryGetTokenRequest {
  id: Long;
}

export interface QueryGetTokenResponse {
  token?: Token;
}

export interface QueryAllTokenRequest {
  pagination?: PageRequest;
}

export interface QueryAllTokenResponse {
  tokens: Token[];
  pagination?: PageResponse;
}

const baseQueryGetTokenRequest: object = { id: Long.UZERO };

export const QueryGetTokenRequest = {
  encode(message: QueryGetTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTokenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTokenRequest } as QueryGetTokenRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTokenRequest {
    const message = { ...baseQueryGetTokenRequest } as QueryGetTokenRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Long.fromString(object.id);
    } else {
      message.id = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryGetTokenRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetTokenRequest>): QueryGetTokenRequest {
    const message = { ...baseQueryGetTokenRequest } as QueryGetTokenRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id as Long;
    } else {
      message.id = Long.UZERO;
    }
    return message;
  },
};

const baseQueryGetTokenResponse: object = {};

export const QueryGetTokenResponse = {
  encode(message: QueryGetTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetTokenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTokenResponse } as QueryGetTokenResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTokenResponse {
    const message = { ...baseQueryGetTokenResponse } as QueryGetTokenResponse;
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromJSON(object.token);
    } else {
      message.token = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetTokenResponse): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetTokenResponse>): QueryGetTokenResponse {
    const message = { ...baseQueryGetTokenResponse } as QueryGetTokenResponse;
    if (object.token !== undefined && object.token !== null) {
      message.token = Token.fromPartial(object.token);
    } else {
      message.token = undefined;
    }
    return message;
  },
};

const baseQueryAllTokenRequest: object = {};

export const QueryAllTokenRequest = {
  encode(message: QueryAllTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTokenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllTokenRequest } as QueryAllTokenRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTokenRequest {
    const message = { ...baseQueryAllTokenRequest } as QueryAllTokenRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllTokenRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllTokenRequest>): QueryAllTokenRequest {
    const message = { ...baseQueryAllTokenRequest } as QueryAllTokenRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllTokenResponse: object = {};

export const QueryAllTokenResponse = {
  encode(message: QueryAllTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tokens) {
      Token.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllTokenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllTokenResponse } as QueryAllTokenResponse;
    message.tokens = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokens.push(Token.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllTokenResponse {
    const message = { ...baseQueryAllTokenResponse } as QueryAllTokenResponse;
    message.tokens = [];
    if (object.tokens !== undefined && object.tokens !== null) {
      for (const e of object.tokens) {
        message.tokens.push(Token.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllTokenResponse): unknown {
    const obj: any = {};
    if (message.tokens) {
      obj.tokens = message.tokens.map((e) => (e ? Token.toJSON(e) : undefined));
    } else {
      obj.tokens = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllTokenResponse>): QueryAllTokenResponse {
    const message = { ...baseQueryAllTokenResponse } as QueryAllTokenResponse;
    message.tokens = [];
    if (object.tokens !== undefined && object.tokens !== null) {
      for (const e of object.tokens) {
        message.tokens.push(Token.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a token by id. */
  Token(request: QueryGetTokenRequest): Promise<QueryGetTokenResponse>;
  /** Queries a list of token items. */
  TokenAll(request: QueryAllTokenRequest): Promise<QueryAllTokenResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Token = this.Token.bind(this);
    this.TokenAll = this.TokenAll.bind(this);
  }
  Token(request: QueryGetTokenRequest): Promise<QueryGetTokenResponse> {
    const data = QueryGetTokenRequest.encode(request).finish();
    const promise = this.rpc.request('issuance.v1beta1.Query', 'Token', data);
    return promise.then((data) => QueryGetTokenResponse.decode(new _m0.Reader(data)));
  }

  TokenAll(request: QueryAllTokenRequest): Promise<QueryAllTokenResponse> {
    const data = QueryAllTokenRequest.encode(request).finish();
    const promise = this.rpc.request('issuance.v1beta1.Query', 'TokenAll', data);
    return promise.then((data) => QueryAllTokenResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
