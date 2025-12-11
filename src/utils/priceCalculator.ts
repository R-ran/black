// 统一的价格计算函数
export interface PriceInfo {
  salePrice: number;
  originalPrice: number | null;
  discountPercent: number | null;
}

export const calculatePrice = (quantity: number): PriceInfo => {
  let totalSalePrice: number;
  let totalOriginalPrice: number | null = null;
  let discountPercent: number | null = null;
  
  if (quantity === 1) {
    totalSalePrice = 29.99;
    totalOriginalPrice = 59.98;
    discountPercent = 50;
  } else if (quantity === 2) {
    totalSalePrice = 44.99;
    totalOriginalPrice = 59.98;
    discountPercent = 24;
  } else if (quantity === 3) {
    // 3条：原价 = 3 × $29.99 = $89.97，现价 = $59.98，节省 = $29.99
    totalOriginalPrice = 3 * 29.99; // $89.97
    totalSalePrice = 59.98;
    discountPercent = Math.round((29.99 / totalOriginalPrice) * 100); // 约33%
  } else if (quantity === 4 || quantity === 5) {
    // 4条和5条价格相同：原价 = 数量 × $29.99，现价 = $89.97
    totalOriginalPrice = quantity * 29.99;
    totalSalePrice = 89.97;
    // 计算节省金额对应的百分比
    const savings = totalOriginalPrice - totalSalePrice;
    discountPercent = Math.round((savings / totalOriginalPrice) * 100);
  } else if (quantity >= 6) {
    // 6条及以上：原价 = 数量 × $29.99，现价 = 原价 - $59.98，节省固定为 $59.98
    totalOriginalPrice = quantity * 29.99;
    totalSalePrice = totalOriginalPrice - 59.98;
    discountPercent = Math.round((59.98 / totalOriginalPrice) * 100);
  } else {
    // 默认情况
    totalSalePrice = quantity * 29.99;
    totalOriginalPrice = null;
    discountPercent = null;
  }
  
  return {
    salePrice: totalSalePrice,
    originalPrice: totalOriginalPrice,
    discountPercent,
  };
};

