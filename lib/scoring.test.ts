import { calcScore } from './scoring';

const bare = () => ({});

// ── Group A: facility amenities (max 55) ─────────────────────────────────────

describe('calcScore — Group A: facilities', () => {
  it('returns 0 for empty place', () => {
    expect(calcScore(bare())).toBe(0);
  });

  it('awards 30 for nursing_room', () => {
    expect(calcScore({ nursing_room: true })).toBe(30);
  });

  it('awards 15 for changing_table', () => {
    expect(calcScore({ changing_table: true })).toBe(15);
  });

  it('awards 10 for family_restroom', () => {
    expect(calcScore({ family_restroom: true })).toBe(10);
  });

  it('awards 55 for all three facility fields', () => {
    expect(calcScore({ nursing_room: true, changing_table: true, family_restroom: true })).toBe(55);
  });

  it('gives 0 for falsy nursing_room values', () => {
    expect(calcScore({ nursing_room: false })).toBe(0);
    expect(calcScore({ nursing_room: null })).toBe(0);
  });
});

// ── Group B: accessibility (max 35) ──────────────────────────────────────────

describe('calcScore — Group B: accessibility', () => {
  it('awards 20 for stroller_ok = "yes"', () => {
    expect(calcScore({ stroller_ok: 'yes' })).toBe(20);
  });

  it('awards 10 for stroller_ok = "partial"', () => {
    expect(calcScore({ stroller_ok: 'partial' })).toBe(10);
  });

  it('awards 0 for stroller_ok = "no"', () => {
    expect(calcScore({ stroller_ok: 'no' })).toBe(0);
  });

  it('awards 0 for absent or unknown stroller_ok', () => {
    expect(calcScore({})).toBe(0);
    expect(calcScore({ stroller_ok: 'unknown' })).toBe(0);
  });

  it('awards 10 for elevator', () => {
    expect(calcScore({ elevator: true })).toBe(10);
  });

  it('awards 5 for ramp', () => {
    expect(calcScore({ ramp: true })).toBe(5);
  });

  it('awards 35 for all accessibility fields (stroller yes + elevator + ramp)', () => {
    expect(calcScore({ stroller_ok: 'yes', elevator: true, ramp: true })).toBe(35);
  });
});

// ── Group C: comfort (max 25) ─────────────────────────────────────────────────

describe('calcScore — Group C: comfort', () => {
  it('awards 15 for noise = "quiet"', () => {
    expect(calcScore({ noise: 'quiet' })).toBe(15);
  });

  it('awards 8 for noise = "medium"', () => {
    expect(calcScore({ noise: 'medium' })).toBe(8);
  });

  it('awards 0 for noise = "loud" or absent', () => {
    expect(calcScore({ noise: 'loud' })).toBe(0);
    expect(calcScore({})).toBe(0);
  });

  it('awards 10 for shade = "good"', () => {
    expect(calcScore({ shade: 'good' })).toBe(10);
  });

  it('awards 5 for shade = "some"', () => {
    expect(calcScore({ shade: 'some' })).toBe(5);
  });

  it('awards 0 for shade = "none" or absent', () => {
    expect(calcScore({ shade: 'none' })).toBe(0);
    expect(calcScore({})).toBe(0);
  });

  it('awards 25 for best combo (quiet + good shade)', () => {
    expect(calcScore({ noise: 'quiet', shade: 'good' })).toBe(25);
  });
});

// ── Cap at 100 ────────────────────────────────────────────────────────────────

describe('calcScore — ceiling at 100', () => {
  it('caps a perfect place at 100 (raw score = 115)', () => {
    expect(calcScore({
      nursing_room: true, changing_table: true, family_restroom: true,
      stroller_ok: 'yes', elevator: true, ramp: true,
      noise: 'quiet', shade: 'good',
    })).toBe(100);
  });

  it('does not cap 98 (A=55 + B=35 + noise=medium(8))', () => {
    expect(calcScore({
      nursing_room: true, changing_table: true, family_restroom: true,
      stroller_ok: 'yes', elevator: true, ramp: true,
      noise: 'medium',
    })).toBe(98);
  });
});

// ── Cross-group additive ──────────────────────────────────────────────────────

describe('calcScore — cross-group combinations', () => {
  it('adds groups independently (nursing_room + stroller partial + noise medium = 48)', () => {
    expect(calcScore({ nursing_room: true, stroller_ok: 'partial', noise: 'medium' })).toBe(48);
  });

  it('works with only B + C fields (stroller yes + shade some = 25)', () => {
    expect(calcScore({ stroller_ok: 'yes', shade: 'some' })).toBe(25);
  });
});
