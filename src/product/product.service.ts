import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { throws } from 'assert';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const {name, type_id, price, qty, view} = createProductDto;
    const newProduct : Product = {
      id: undefined,
      name,
      type_id,
      price,
      qty,
      view,
      isActive: true,
      isDelete: false
    };
    return this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: {id}});
    if(!product){
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: {id}});
    if(!product){
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    product.name = updateProductDto.name;
    product.type_id = updateProductDto.type_id;
    product.price = updateProductDto.price;
    product.qty = updateProductDto.qty;
    product.view = updateProductDto.view;
    return this.productRepository.save(product)
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: {id}});
    if(!product){
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
    return "Ok"
  }
}
