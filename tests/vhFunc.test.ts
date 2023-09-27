import { vhToPx, vwToPx, pxToVh, pxToVw, vmin, vmax } from '../src/ts/vhFunc';

describe('Unit Tests for Conversion Functions', () => {
  describe('vhToPx', () => {
    it('should convert vh to px correctly', () => {
      const vhValue = 10;

      const pxResult = vhToPx(vhValue);

      expect(pxResult).toBe(76.8);
    });
  });

  describe('vwToPx', () => {
    it('should convert vw to px correctly', () => {
      const vwValue = 10;

      const pxResult = vwToPx(vwValue);

      expect(pxResult).toBe(102.4);
    });
  });

  describe('pxToVh', () => {
    it('should convert px to vh correctly', () => {
      const pxValue = 100;

      const vhResult = pxToVh(pxValue);

      expect(vhResult).toBe(13.020833333333334);
    });
  });

  describe('pxToVw', () => {
    it('should convert px to vw correctly', () => {
      const pxValue = 100;

      const vwResult = pxToVw(pxValue);

      expect(vwResult).toBe(9.765625);
    });
  });

  describe('vmin', () => {
    it('should calculate vmin correctly', () => {
      const percentValue = 50;

      const vminResult = vmin(percentValue);

      expect(vminResult).toBe(4.8828125);
    });
  });

  describe('vmax', () => {
    it('should calculate vmax correctly', () => {
      const percentValue = 50;

      const vmaxResult = vmax(percentValue);

      expect(vmaxResult).toBe(6.510416666666667);
    });
  });
});
