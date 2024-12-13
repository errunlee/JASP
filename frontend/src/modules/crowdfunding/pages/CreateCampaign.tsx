// import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SelectElement from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const CrowdfundingPage = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      fundingNeeded: false,
      amount: "",
      paymentMethod: "",
    },
  });

  const fundingNeeded = form.watch("fundingNeeded");

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Campaign submitted successfully!");
  };

  return (
    <section className="container mx-auto py-12 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        Create Your Environmental Campaign
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-foreground shadow-md rounded-lg p-8 space-y-6"
        >
          {/* Campaign Title */}
          <div>
            <Input
              name="title"
              label="Campaign Title"
              form={form}
              type="text"
              placeholder="Enter campaign title"
            />
          </div>

          {/* Campaign Description */}
          <div>
            <Label htmlFor="description" className="text-lg font-medium">
              Campaign Description
            </Label>
            <Textarea id="description" placeholder="Describe your campaign" />
          </div>

          {/* Campaign Category */}
          <div>
            <SelectElement
              form={form}
              label="Category"
              name="category"
              placeholder="Select a payment method"
              data={[
                { label: "Recycling", value: "recycling" },
                { label: "Afforestation", value: "afforestation" },
                { label: "Water Cleanup", value: "water-cleanup" },
              ]}
            />
          </div>

          {/* Funding Needed Toggle */}
          <div className="flex items-center space-x-4">
            <Label htmlFor="fundingNeeded" className="text-lg font-medium">
              Is funding needed?
            </Label>
            <Controller
              name="fundingNeeded"
              control={form.control}
              render={({ field }) => (
                <Switch
                  id="fundingNeeded"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Conditional Fields for Funding Info */}
          {fundingNeeded && (
            <div className="space-y-6">
              <div>
                <Input
                  form={form}
                  label="Funding Amount (NRS)"
                  name="amount"
                  id="amount"
                  type="number"
                  placeholder="Enter the amount needed"
                />
              </div>

              <div>
                <SelectElement
                  form={form}
                  label="Payment Method"
                  name="paymentMethod"
                  placeholder="Select a payment method"
                  data={[
                    { label: "PayPal", value: "paypal" },
                    { label: "Stripe", value: "stripe" },
                    { label: "Bank Transfer", value: "bank-transfer" },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full py-2 text-lg bg-primary">
            Submit Campaign
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CrowdfundingPage;
