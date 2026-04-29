"use client";

import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Warehouse, Server, HeartHandshake } from "lucide-react";
import React from "react";

const brandDetails = [
  {
    key: "lidl",
    name: "Lidl",
    icon: <Users className="w-8 h-8 text-muted-foreground" />,
  },
  {
    key: "vega",
    name: "VEGA",
    icon: <Warehouse className="w-8 h-8 text-muted-foreground" />,
  },
  {
    key: "stackit",
    name: "StackIT / Schwarz Digits",
    icon: <Server className="w-8 h-8 text-muted-foreground" />,
  },
  {
    key: "drk",
    name: "DRK",
    icon: <HeartHandshake className="w-8 h-8 text-muted-foreground" />,
  },
];

const Brands = () => {
  const { t } = useLanguage();

  return (
    <section id="brands" className="py-20 md:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 g-fade-up">
            <h3 className="uppercase text-muted font-medium tracking-widest">
                {t("brands.title")}
            </h3>
            <p className="text-lg text-muted-foreground mt-2">{t("brands.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brandDetails.map((brand, index) => {
                const brandTranslation = t(`brands.details.${brand.key}`, { returnObjects: true });
                return (
                    <div key={brand.key} className="g-stagger-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <Card className="h-full bg-background/50 border-border/50 hover:border-accent transition-colors duration-300">
                            <CardHeader className="flex flex-row items-center gap-4">
                                {brand.icon}
                                <div>
                                    <CardTitle className="text-xl font-bold">{brandTranslation.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{brandTranslation.role}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80">{brandTranslation.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Brands;
