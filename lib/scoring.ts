
export function calcScore(p: any) {
  const A = (p.nursing_room?30:0) + (p.changing_table?15:0) + (p.family_restroom?10:0);
  const B = (p.stroller_ok==='yes'?20:(p.stroller_ok==='partial'?10:0)) + (p.elevator?10:0) + (p.ramp?5:0);
  const C = (p.noise==='quiet'?15:(p.noise==='medium'?8:0)) + (p.shade==='good'?10:(p.shade==='some'?5:0));
  return Math.min(100, A+B+C);
}
