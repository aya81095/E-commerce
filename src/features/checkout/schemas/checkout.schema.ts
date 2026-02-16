import z from "zod";

export const checkoutSchema = z.object({
    details:z.string().nonempty("Details is required").min(10,"Details must be at least 10 characters").max(150,"Details must be at most 150 characters"),
    phone:z.string().nonempty("Phone is required").regex(/^(\+2)?01[0125][0-9]{8}$/,"Phone must be an Egyptian number"),
    city:z.string().nonempty("City is required").min(3,"City must be at least 3 characters").max(50,"City must be at most 50 characters"),    
})

export type CheckoutSchemaValues = z.infer<typeof checkoutSchema>;

