"use client";

import React from "react";
import { Button } from "../button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant="link" asChild className="font-normal w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
