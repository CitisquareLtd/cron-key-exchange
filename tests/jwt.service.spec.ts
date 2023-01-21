import {describe, expect, test, beforeAll} from '@jest/globals';
import {JwtService} from '../src/jwt.service'
import keyPair from 'node-genrsa';

let jwtService: JwtService 

beforeAll(async () => { 
  
  const pair = await keyPair({
    bits: 2048,
    exponent: 65537
  });

  // console.log(pair);
  jwtService = new JwtService(pair.private, pair.public)
});

describe('Test Jwt Service', () => {
test('Can decode token', () => {
    const authId = 'transaction-service'
    const token  = jwtService.generateToken(authId)
    // const decoded = 
    expect(jwtService.verifyToken(token)).toBeDefined();
  })

  test('decoded value should have authId', () => {
    const authId = 'transaction-service'
    const token  = jwtService.generateToken(authId)
    console.log(jwtService.verifyToken(token))
    // const decoded = 
    expect(jwtService.verifyToken(token)).toHaveProperty('authId', authId);
  })
});
 