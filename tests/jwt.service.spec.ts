import { describe, expect, test, beforeAll } from '@jest/globals';
import { JwtService } from '../src/jwt.service';
import keyPair from 'node-genrsa';

let jwtService: JwtService;

const issuer = 'jest-enterprise'
    const authId = 'transaction-service';

beforeAll(async () => {
  const pair = await keyPair({
    bits: 2048,
    exponent: 65537,
  });

  // console.log(pair);
  jwtService = new JwtService({ issuer , privateKey: pair.private, publicKey: pair.public });
});

describe('Test Jwt Service', () => {
  test('Can decode token', () => {
   
    const token = jwtService.generateToken(authId);
    // const decoded =
    expect(jwtService.verifyToken(token)).toBeDefined();
  });

  test('decoded value should have authId', () => {
    
    const token = jwtService.generateToken(authId);
    console.log(jwtService.verifyToken(token));
    // const decoded =
    expect(jwtService.verifyToken(token).payload).toHaveProperty('authId', authId)
    expect(jwtService.verifyToken(token).payload).toHaveProperty('iss', issuer)
    expect(jwtService.verifyToken(token).payload).toHaveProperty('exp')
    expect(jwtService.verifyToken(token).payload).toHaveProperty('iat')
  });

  test('Token must be JWT encoded in RS256', () => {

    const token = jwtService.generateToken(authId); 
    expect(jwtService.verifyToken(token).header).toHaveProperty('alg', 'RS256')
    expect(jwtService.verifyToken(token).header).toHaveProperty('typ', 'JWT') 
  });
});
