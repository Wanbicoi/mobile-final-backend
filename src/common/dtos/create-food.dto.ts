import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFoodDto {
  @ApiProperty({ example: 'Banh xeo`' })
  @IsNotEmpty()
  title: string;

  // prettier-ignore
  @ApiProperty({ example: 'Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. ', })
  @IsNotEmpty()
  body: string;

  // prettier-ignore
  @ApiProperty({ example: ['https://images.unsplash.com/photo-1575936123452-b67c3203c357']})
  @IsNotEmpty()
  images: string[];

  @ApiPropertyOptional({ example: [ "1 rack of baby back ribs", "1 cup of BBQ sauce", "2 cloves of minced garlic", "1 tsp of paprika", "1 tsp of salt", "1 tsp of black pepper" ], }) //prettier-ignore
  @IsOptional()
  ingredients: string[];

  @ApiPropertyOptional({ example: [ "1. Preheat oven to 300 degrees F (150 degrees C).", "2. In a small bowl, mix together the garlic, paprika, salt, and black pepper.", "3. Rub the seasoning mixture all over the ribs.", "4. Place the ribs on a baking sheet and cover with foil.", "5. Bake in the preheated oven for 2 1/2 hours.", "6. Remove the foil and brush BBQ sauce on both sides of the ribs.", "7. Return the ribs to the oven and bake for an additional 30 minutes, or until the ribs are tender.", "8. Let the ribs rest for 5 minutes before slicing and serving." ], }) //prettier-ignore
  @IsOptional()
  recipe: string[];

  @ApiPropertyOptional({ example: { Calories: '343', Fat: '21g', 'Saturated Fat': '6g', Cholesterol: '74mg', Sodium: '599mg', Carbohydrate: '16g', Fiber: '1g', Sugar: '13g', Protein: '20g', }, }) //prettier-ignore
  @IsOptional()
  nutrition_fact: object;

  @ApiPropertyOptional({
    example: ['Vegetarian'],
    description: "Categories' id",
  })
  @IsOptional()
  categories: string[];
}
