describe("Test", function () {
    it("should pass this test", function () {
        expect(true).toBe(true);
    });

    it("should fail this test", function () {
        expect(true).tobe(false);
    });
});