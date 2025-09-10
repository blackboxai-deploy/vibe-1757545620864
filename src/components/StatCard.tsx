'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, gradient, textColor }) => {
  return (
    <Card className={`bg-gradient-to-br ${gradient}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`${textColor} text-sm font-medium`}>{title}</p>
            <p className={`text-3xl font-bold ${textColor.replace('600', '700')}`}>
              {typeof value === 'number' && title.includes('R$') ? `R$ ${value.toLocaleString()}` : value}
            </p>
          </div>
          <Icon className={`h-8 w-8 ${textColor.replace('600', '500')}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;