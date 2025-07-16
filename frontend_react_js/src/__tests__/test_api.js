import * as api from "../api";

// Note: using jest.spyOn and global.fetch mock for isolated testing of the API module

describe("API module", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        headers: { get: () => "application/json" },
        json: () => Promise.resolve({ mock: "ok" }),
        text: () => Promise.resolve("ok")
      })
    );
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetchCustomers forwards params", async () => {
    await api.fetchCustomers({ q: "test" });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/customers/"),
      expect.objectContaining({ method: "GET" })
    );
  });

  it("createCustomer sends POST", async () => {
    await api.createCustomer({ name: "A" });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/customers/"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("Handles error for bad fetch", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: () => Promise.resolve("fail"),
      headers: { get: () => "application/json" },
    });
    await expect(api.fetchCustomers()).rejects.toThrow(/API error/);
  });

  it("Returns null on 204", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      headers: { get: () => "application/json" },
      text: () => Promise.resolve(""),
      json: () => Promise.resolve(""),
    });
    const result = await api.fetchCustomers();
    expect(result).toBeNull();
  });

  it("Returns text if content-type is not JSON", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: { get: () => "text/plain" },
      text: () => Promise.resolve("plain text"),
      json: () => Promise.reject("Should not call JSON"),
    });
    const result = await api.fetchCustomers();
    expect(result).toBe("plain text");
  });
});
