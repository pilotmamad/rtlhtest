type D1Database = unknown;

export type CheckoutLineItem = {
  productId: string;
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;
  customization: {
    type: "none" | "engraving" | "stamp";
    productColor?: {
      id: string;
      label: string;
      priceDelta?: number;
    };
    engravingText?: string;
    stampText?: string;
    stampColor?: "natural" | "gold" | "silver";
  };
};

export type CheckoutRequest = {
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  delivery: {
    emirate: string;
    address: string;
    notes?: string;
  };
  promoCode?: string;
  items: CheckoutLineItem[];
};

type Env = {
  RTLH_ORDERS?: D1Database;
  ZIINA_API_KEY?: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const payload = (await request.json()) as CheckoutRequest;
    const validation = validateCheckout(payload);

    if (!validation.ok) {
      return json({ error: validation.error }, 400);
    }

    // Future implementation:
    // 1. Recalculate all prices server-side from D1/product config.
    // 2. Persist a pending order in D1.
    // 3. Create a Ziina checkout session with env.ZIINA_API_KEY.
    // 4. Return { checkoutUrl, orderId } to the frontend.
    void env;

    return json({
      orderId: `RTLH-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      status: "mock_created",
      checkoutUrl: "/success"
    });
  }
};

function validateCheckout(payload: CheckoutRequest) {
  if (!payload.customer?.name || !payload.customer?.phone) {
    return { ok: false, error: "Customer name and phone are required." };
  }

  if (!payload.delivery?.emirate || !payload.delivery?.address) {
    return { ok: false, error: "Delivery emirate and address are required." };
  }

  if (!payload.items?.length) {
    return { ok: false, error: "At least one item is required." };
  }

  return { ok: true };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}
