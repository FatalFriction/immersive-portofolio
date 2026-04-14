"use client";

import { forwardRef } from "react";

import BountyCard from "./BountyCard";
import { BountyGridItem } from "./bountyGridTypes";

interface FeaturedCardProps {
  item: BountyGridItem;
  isActive: boolean;
  isFocused: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onClick: (id: string) => void;
}

const FeaturedCard = forwardRef<HTMLButtonElement, FeaturedCardProps>(function FeaturedCard(
  { item, isActive, isFocused, onHoverStart, onHoverEnd, onClick },
  ref
) {
  return (
    <BountyCard
      ref={ref}
      item={item}
      isActive={isActive}
      isFocused={isFocused}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
    />
  );
});

export default FeaturedCard;
