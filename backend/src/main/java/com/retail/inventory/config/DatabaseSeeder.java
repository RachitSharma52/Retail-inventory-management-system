package com.retail.inventory.config;

import com.retail.inventory.model.*;
import com.retail.inventory.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(
            ProductRepository productRepository,
            WarehouseRepository warehouseRepository,
            OrderRepository orderRepository,
            SupplierRepository supplierRepository,
            CustomerRepository customerRepository,
            CategoryRepository categoryRepository,
            TransferRepository transferRepository) {

        return args -> {
            if (warehouseRepository.count() == 0) {
                warehouseRepository.saveAll(Arrays.asList(
                    new Warehouse("WH-N01", "North Hub", "New Delhi", "Aarav Mehta", 82, 1840, "Operational"),
                    new Warehouse("WH-C02", "Central Depot", "Noida", "Priya Sharma", 64, 1260, "Operational"),
                    new Warehouse("WH-W03", "West Warehouse", "Gurugram", "Rohan Kapoor", 91, 2150, "Near capacity")
                ));
            }

            if (productRepository.count() == 0) {
                productRepository.saveAll(Arrays.asList(
                    new Product("WBS-1048", "Wireless Barcode Scanner", "Electronics", "North Hub", 124, 40, 2499.0, "In stock"),
                    new Product("TLR-1049", "Thermal Label Roll", "Packaging", "Central Depot", 18, 50, 320.0, "Low stock"),
                    new Product("HDS-1050", "Heavy Duty Storage Bin", "Storage", "West Warehouse", 86, 25, 890.0, "In stock"),
                    new Product("ISG-1051", "Industrial Safety Gloves", "Safety", "North Hub", 0, 30, 180.0, "Out of stock"),
                    new Product("PT-1052", "Packing Tape - 48mm", "Packaging", "Central Depot", 210, 60, 95.0, "In stock"),
                    new Product("HRR-1053", "Handheld RFID Reader", "Electronics", "West Warehouse", 12, 15, 6799.0, "Low stock"),
                    new Product("PWF-1054", "Pallet Wrap Film", "Packaging", "North Hub", 74, 20, 560.0, "In stock"),
                    new Product("SPT-1055", "Steel Platform Trolley", "Equipment", "Central Depot", 9, 10, 4250.0, "Low stock")
                ));
            }

            if (orderRepository.count() == 0) {
                orderRepository.saveAll(Arrays.asList(
                    new Order("ORD-2481", "Apex Retail Pvt. Ltd.", "21 Nov 2026", 8, 42850.0, "Processing", "Sales"),
                    new Order("ORD-2480", "Metro Supplies", "21 Nov 2026", 4, 18700.0, "Shipped", "Sales"),
                    new Order("ORD-2479", "Northstar Components", "20 Nov 2026", 12, 76200.0, "Delivered", "Sales"),
                    new Order("PO-0918", "Prime Industrial Traders", "20 Nov 2026", 6, 93500.0, "Pending", "Purchase"),
                    new Order("ORD-2478", "Urban Home Store", "19 Nov 2026", 3, 12600.0, "Cancelled", "Sales")
                ));
            }

            if (supplierRepository.count() == 0) {
                supplierRepository.saveAll(Arrays.asList(
                    new Supplier("Prime Industrial Traders", "Ankit Verma", "orders@primeindustrial.in", "+91 98710 44218", "New Delhi", 32, "4.8", "Active"),
                    new Supplier("Vertex Packaging Co.", "Neha Bansal", "sales@vertexpack.in", "+91 98102 77341", "Noida", 18, "4.6", "Active"),
                    new Supplier("TechLine Distribution", "Karan Sethi", "support@techline.in", "+91 98990 11820", "Gurugram", 24, "4.5", "Active"),
                    new Supplier("SafeWork Essentials", "Ishita Rao", "hello@safework.in", "+91 99584 60213", "Faridabad", 12, "4.2", "On hold")
                ));
            }

            if (customerRepository.count() == 0) {
                customerRepository.saveAll(Arrays.asList(
                    new Customer("CUS-1001", "Apex Retail Pvt. Ltd.", "Ritika Malhotra", "ritika@apexretail.in", "New Delhi", 28, 486500.0, "Active"),
                    new Customer("CUS-1002", "Metro Supplies", "Sahil Khanna", "sahil@metrosupplies.in", "Noida", 19, 324800.0, "Active"),
                    new Customer("CUS-1003", "Northstar Components", "Meera Nair", "meera@northstar.in", "Gurugram", 16, 291400.0, "Active"),
                    new Customer("CUS-1004", "Urban Home Store", "Dev Arora", "dev@urbanhome.in", "Faridabad", 11, 168200.0, "Active"),
                    new Customer("CUS-1005", "Brightline Traders", "Ananya Jain", "ananya@brightline.in", "Ghaziabad", 7, 98400.0, "On hold"),
                    new Customer("CUS-1006", "Evergreen Mart", "Kabir Sood", "kabir@evergreen.in", "Delhi", 5, 76300.0, "Active")
                ));
            }

            if (categoryRepository.count() == 0) {
                categoryRepository.saveAll(Arrays.asList(
                    new Category("CAT-001", "Electronics", 42, 1280, 842500.0, "Active", "blue"),
                    new Category("CAT-002", "Packaging", 36, 2460, 386400.0, "Active", "green"),
                    new Category("CAT-003", "Storage", 24, 940, 512800.0, "Active", "purple"),
                    new Category("CAT-004", "Safety", 18, 610, 184200.0, "Active", "amber"),
                    new Category("CAT-005", "Equipment", 15, 325, 729500.0, "Active", "rose"),
                    new Category("CAT-006", "Office Supplies", 22, 870, 96500.0, "Active", "blue")
                ));
            }

            if (transferRepository.count() == 0) {
                transferRepository.saveAll(Arrays.asList(
                    new Transfer("TRF-3208", "North Hub", "Central Depot", 4, 120, "21 Nov 2026", "In transit"),
                    new Transfer("TRF-3207", "West Warehouse", "North Hub", 2, 48, "21 Nov 2026", "Pending"),
                    new Transfer("TRF-3206", "Central Depot", "West Warehouse", 6, 210, "20 Nov 2026", "Completed"),
                    new Transfer("TRF-3205", "North Hub", "West Warehouse", 3, 75, "19 Nov 2026", "Completed"),
                    new Transfer("TRF-3204", "West Warehouse", "Central Depot", 1, 30, "18 Nov 2026", "Cancelled")
                ));
            }
        };
    }
}
