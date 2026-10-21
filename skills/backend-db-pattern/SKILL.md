# Backend Development Pattern - 4 Steps to Database

## Tổng quan

Khi phát triển module mới hoặc thêm/sửa entity trong ERP system, tuân thủ **4 BƯỚC** sau để đảm bảo kiến trúc clean và dễ bảo trì.

---

## 4 BƯỚC (Phải làm theo thứ tự)

### Bước 1: Services (Application Layer)
```csharp
// ❌ KHÔNG ĐƯỢC: Inject ErpDbContext trực tiếp
public class MyService 
{
    private readonly ErpDbContext _context; // SAI
}

// ✅ ĐÚNG: Inject Repository Interface
public class MyService 
{
    private readonly IMyEntityRepository _repository; // ĐÚNG
    
    public MyService(IMyEntityRepository repository)
    {
        _repository = repository;
    }
}
```

### Bước 2: Repository Interface (Domain Layer)
Khai báo interface trong `Domain/Repositories.cs`:

```csharp
// Domain/Repositories.cs
namespace Backend.Modules.MyModule.Domain
{
    public interface IMyEntityRepository
    {
        Task<MyEntity?> GetByIdAsync(int id);
        Task<IEnumerable<MyEntity>> GetAllAsync();
        Task<MyEntity> AddAsync(MyEntity entity);
        Task UpdateAsync(MyEntity entity);
        Task DeleteAsync(MyEntity entity);
    }
}
```

### Bước 3: Repository Implementation (Infrastructure Layer)
Implement interface trong `Infrastructure/Repositories.cs`:

```csharp
// Infrastructure/Repositories.cs
namespace Backend.Modules.MyModule.Infrastructure
{
    public class MyEntityRepository : IMyEntityRepository
    {
        private readonly ErpDbContext _context;
        private readonly DbSet<MyEntity> _dbSet;

        public MyEntityRepository(ErpDbContext context)
        {
            _context = context;
            _dbSet = context.Set<MyEntity>();
        }

        public async Task<MyEntity?> GetByIdAsync(int id) 
            => await _dbSet.FindAsync(id);
            
        public async Task<IEnumerable<MyEntity>> GetAllAsync() 
            => await _dbSet.ToListAsync();
            
        public async Task<MyEntity> AddAsync(MyEntity entity) 
        { 
            _dbSet.Add(entity); 
            await _context.SaveChangesAsync(); 
            return entity; 
        }
        
        // ... các method khác
    }
}
```

### Bước 4: Khai báo Entity + EntityConfiguration + DbSet

#### 4a. Entity (Domain Layer)
Tạo/khai báo entity trong `Domain/Entities.cs`:

```csharp
// Domain/Entities.cs
namespace Backend.Modules.MyModule.Domain.Entities
{
    public class MyEntity : BaseDomainEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        // Các property khác...
    }
}
```

#### 4b. EntityConfiguration (Infrastructure Layer)
Tạo cấu hình trong `Infrastructure/EntityConfigurations/`:

```csharp
// Infrastructure/EntityConfigurations/MyModuleEntityConfiguration.cs
namespace Backend.Modules.MyModule.Infrastructure.EntityConfigurations
{
    public class MyModuleEntityConfiguration : IEntityTypeConfiguration<MyEntity>
    {
        public void Configure(EntityTypeBuilder<MyEntity> builder)
        {
            builder.ToTable("MyModule_MyEntities");
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
            // Cấu hình khác...
        }
    }
}
```

#### 4c. DbSet trong ErpDbContext
Khai báo DbSet trong `Modules/Backend.Shared/Infrastructure/ErpDbContext.cs`:

```csharp
// ErpDbContext.cs (1 file duy nhất cho toàn hệ thống)
namespace Backend.Shared.Infrastructure
{
    public class ErpDbContext : DbContext
    {
        // Các DbSet khác...
        
        // THÊM DÒNG NÀY:
        public DbSet<MyEntity> MyEntities { get; set; }
    }
}
```

---

## Cấu trúc thư mục module

```
Modules/MyModule/
├── Application/
│   └── Services/
│       ├── MyService.cs          ← Bước 1: Services (inject Repository Interface)
│       └── Interfaces/
├── Domain/
│   ├── Entities.cs               ← Bước 4a: Entity
│   ├── Repositories.cs           ← Bước 2: Repository Interface
│   └── Events/
├── Infrastructure/
│   ├── Repositories.cs           ← Bước 3: Repository Implementation
│   ├── EntityConfigurations/
│   │   └── MyModuleEntityConfiguration.cs  ← Bước 4b: EntityConfiguration
│   └── Services/
└── Presentation/
```

---

## Quy tắc quan trọng

### ✅ ĐƯỢC PHÉP
- Service inject Repository Interface
- Repository Implementation dùng ErpDbContext
- Entity và EntityConfig trong module

### ❌ KHÔNG ĐƯỢC
- Service inject ErpDbContext trực tiếp
- Service dùng `_context.EntityName`
- Query trực tiếp trong Service

---

## Ví dụ thực tế

### Thêm entity mới `DeviceInfo`:

1. **Bước 1 (Service)**: `DeviceFingerprintingService` inject `IUserDeviceRepository`
2. **Bước 2 (Interface)**: `IUserDeviceRepository` trong `Domain/Repositories.cs`
3. **Bước 3 (Implementation)**: `UserDeviceRepository` trong `Infrastructure/Repositories.cs`
4. **Bước 4a (Entity)**: `DeviceInfo` class trong `Domain/Entities.cs`
5. **Bước 4b (EntityConfig)**: Cấu hình trong `UserManagementEntityConfiguration.cs`
6. **Bước 4c (DbSet)**: `public DbSet<DeviceInfo> Devices { get; set; }` trong `ErpDbContext`

---

## Khi nào cần tạo Repository mới?

Tạo repository khi Service cần thao tác với entity:

| Tình huống | Cần Repository mới? |
|------------|---------------------|
| Service dùng `_context.EntityName` | ✅ Có |
| Chỉ đọc từ cache/API bên ngoài | ❌ Không |
| Entity đã có repository | ❌ Không |
| Cần thêm method phức tạp | ✅ Mở rộng interface hiện có |

---

## Checklist trước khi commit

- [ ] Service inject Repository Interface (không phải ErpDbContext)
- [ ] Repository Interface khai báo trong Domain/Repositories.cs
- [ ] Repository Implementation trong Infrastructure/Repositories.cs
- [ ] Entity khai báo trong Domain/Entities.cs
- [ ] EntityConfiguration trong Infrastructure/EntityConfigurations/
- [ ] DbSet khai báo trong ErpDbContext
- [ ] Build thành công: `dotnet build`
