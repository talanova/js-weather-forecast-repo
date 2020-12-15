describe("try mock localStorage", () => {
  beforeEach(() => {
    // values stored in tests will also be available in other tests unless you run
    localStorage.clear();
    // you could also reset all mocks, but this could impact your other mocks
    jest.resetAllMocks();
    // or individually reset a mock used
    localStorage.setItem.mockClear();
  });
  /*
    it('should save to localStorage', () => {
        const KEY = 'foo';
        const VALUE = 'bar';
        dispatch(action.update(KEY, VALUE));
        expect(global.localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
        // expect(global.localStorage.__STORE__[KEY]).toBe(VALUE);
        // expect(Object.keys(global.localStorage.__STORE__).length).toBe(1);
    });
 */
});
