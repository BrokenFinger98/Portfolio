"use client";

import { useState } from "react";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Users, 
  Target, 
  Zap, 
  Code, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Server,
  Settings
} from "lucide-react";

interface ProjectDetailPageProps {
  projectId: string;
}

interface KeyFeature {
  title: string;
  description: string[];
}

interface ImageItem {
  title?: string;
  src: string;
  alt?: string;
  size?: string;
}

interface TechItem {
  name: string;
  icon: string;
  reason?: string;
  version?: string;
}

export default function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const [activeSection, setActiveSection] = useState("overview");

  const renderKeyFeatures = (overview: Record<string, unknown>) => {
    if (!('keyFeatures' in overview) || !overview.keyFeatures || !Array.isArray(overview.keyFeatures) || overview.keyFeatures.length === 0) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          주요 기능
        </h3>
        <div className="space-y-5">
          {(overview.keyFeatures as KeyFeature[]).map((feature: KeyFeature, index: number) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h4>
              <ul className="list-none space-y-2 ml-4">
                {feature.description.map((desc: string, descIndex: number) => (
                  <li key={descIndex} className="text-gray-600 dark:text-gray-300 text-base flex items-start">
                    <span className="text-gray-400 mr-3">•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVideoPortfolio = (project: Record<string, unknown>) => {
    if (!('videoPortfolio' in project) || !project.videoPortfolio) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎬 영상 포트폴리오
        </h3>
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={convertToEmbedUrl(project.videoPortfolio as string)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="프로젝트 영상 포트폴리오"
          />
        </div>
      </div>
    );
  };

  const renderDemoVideo = (project: Record<string, unknown>) => {
    if (!('demoVideo' in project) || !project.demoVideo) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎥 시연 영상
        </h3>
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={convertToEmbedUrl(project.demoVideo as string)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="프로젝트 시연 영상"
          />
        </div>
      </div>
    );
  };

  // YouTube URL을 임베드 URL로 변환하는 함수
  const convertToEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube URL 패턴들 처리
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // 이미 embed URL인 경우 그대로 반환
    return url;
  };

  // 프로젝트 데이터 (실제로는 API나 데이터베이스에서 가져올 수 있음)
  const projectsData = {
    memento: {
      title: "MEMENTO",
      subtitle: "TDD와 개인 PC 서버 운영을 통한 추억 공유 플랫폼",
      thumbnail: "/images/projects/memento/logo.png",
      duration: "2025.07.29 ~ 2025.09.05 (5주)",
      team: "백엔드 3명, 프론트 2명",
      role: "Back-End, DevOps",
      github: "https://github.com/BrokenFinger98/memento",
      demo: "#",
      overview: {
        background: "클라우드 서비스 비용 부담과 개발 과정에서의 테스트 중요성, 그리고 팀 협업 시 API 문서 관리의 어려움을 해결하고자 했습니다. 개인 PC를 직접 서버로 운영하며 인프라 비용을 절약하고, TDD와 문서 자동화를 통해 개발 품질을 높이는 것이 목표였습니다."
      },
      challenges: [
        {
          problem: "클라우드 비용 절약을 위한 개인 서버 운영",
          situation: "AWS나 GCP 같은 클라우드 서비스 비용이 부담스러워 개인 PC를 직접 서버로 활용해야 했지만, 안정적인 운영과 외부 접근 설정에 대한 경험이 부족했습니다.",
          solution: "개인 PC Linux 서버 구축과 포트 포워딩 설정",
          implementation: [
            "Ubuntu Server 설치 및 네트워크 설정",
            "공유기 포트 포워딩으로 외부 접근 허용",
            "방화벽 및 보안 설정으로 안전한 서버 운영",
            "Docker Compose를 활용한 서비스 컨테이너화"
          ],
          result: "월 클라우드 비용 100% 절약 및 서버 운영 실무 경험 획득"
        },
        {
          problem: "대용량 미디어 파일의 효율적 저장과 관리",
          situation: "음성, 이미지 등 다양한 미디어 파일을 저장해야 했지만, 파일 시스템 기반 저장은 확장성과 관리 측면에서 한계가 있었습니다.",
          solution: "Minio 오브젝트 스토리지 도입",
          implementation: [
            "Minio 서버 구축 및 S3 호환 API 설정",
            "버킷 정책을 통한 파일 접근 권한 관리",
            "Spring Boot와 Minio Client 연동 구현",
            "미디어 파일 업로드/다운로드 API 개발"
          ],
          result: "확장 가능한 오브젝트 스토리지 구축 및 S3 호환성 확보"
        },
        {
          problem: "협업 시 API 문서 동기화와 테스트 커버리지 확보",
          situation: "팀 개발 과정에서 API 명세 변경 시 문서 업데이트가 지연되고, 수동 테스트로 인한 버그 발생 위험이 높았습니다.",
          solution: "TDD 도입과 Spring REST DOCS 기반 문서 자동화",
          implementation: [
            "JUnit5와 MockMvc를 활용한 API 테스트 작성",
            "Given-When-Then 패턴의 체계적인 테스트 코드",
            "Spring REST DOCS로 테스트 기반 문서 자동 생성",
            "Gradle 빌드 시 문서 자동 배포 설정"
          ],
          result: "90% 이상 테스트 커버리지 달성 및 항상 최신 상태의 API 문서 제공"
        }
      ],
      techStack: {
        backend: [
          { name: "Java 17", reason: "최신 LTS 버전으로 안정성과 성능 보장" },
          { name: "Spring Boot", reason: "빠른 개발과 운영 효율성" },
          { name: "Spring Data JPA", reason: "객체 지향적 데이터 액세스 계층" },
          { name: "Spring Security", reason: "사용자 인증과 권한 관리" }
        ],
        storage: [
          { name: "Minio", reason: "S3 호환 오브젝트 스토리지로 미디어 파일 관리" },
          { name: "MySQL", reason: "관계형 데이터의 일관성과 ACID 트랜잭션" }
        ],
        testing: [
          { name: "JUnit5", reason: "TDD 방법론의 핵심 테스트 프레임워크" },
          { name: "Spring REST DOCS", reason: "테스트 기반 API 문서 자동 생성" },
          { name: "MockMvc", reason: "Spring MVC 컨트롤러 통합 테스트" }
        ],
        infrastructure: [
          { name: "Ubuntu Server", reason: "개인 PC 기반 Linux 서버 환경" },
          { name: "Docker", reason: "컨테이너 기반 서비스 배포" },
          { name: "Docker Compose", reason: "멀티 컨테이너 애플리케이션 관리" }
        ]
      },
      codeExamples: [
        {
          title: "Minio 오브젝트 스토리지 서비스",
          language: "java",
          code: `@Service
@RequiredArgsConstructor
public class MinioStorageService {
    
    private final MinioClient minioClient;
    
    @Value("\${minio.bucket.name}")
    private String bucketName;
    
    public String uploadFile(MultipartFile file, String fileName) throws Exception {
        // 버킷 존재 확인 및 생성
        ensureBucketExists();
        
        // 파일 업로드
        minioClient.putObject(
            PutObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .stream(file.getInputStream(), file.getSize(), -1)
                .contentType(file.getContentType())
                .build()
        );
        
        // 퍼블릭 URL 반환
        return minioClient.getPresignedObjectUrl(
            GetPresignedObjectUrlArgs.builder()
                .method(Method.GET)
                .bucket(bucketName)
                .object(fileName)
                .expiry(60 * 60 * 24) // 24시간 유효
                .build()
        );
    }
    
    private void ensureBucketExists() throws Exception {
        boolean bucketExists = minioClient.bucketExists(
            BucketExistsArgs.builder().bucket(bucketName).build());
        
        if (!bucketExists) {
            minioClient.makeBucket(
                MakeBucketArgs.builder().bucket(bucketName).build());
                
            // 퍼블릭 읽기 정책 설정
            String policy = """
                {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Principal": "*",
                            "Action": "s3:GetObject",
                            "Resource": "arn:aws:s3:::%s/*"
                        }
                    ]
                }""".formatted(bucketName);
                
            minioClient.setBucketPolicy(
                SetBucketPolicyArgs.builder()
                    .bucket(bucketName)
                    .config(policy)
                    .build()
            );
        }
    }
}`
        },
        {
          title: "TDD 기반 API 테스트 with Spring REST DOCS",
          language: "java",
          code: `@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest(MemoryController.class)
class MemoryControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private MemoryService memoryService;
    
    @Test
    @DisplayName("추억 생성 API 테스트")
    void createMemory_Success() throws Exception {
        // Given
        MemoryCreateRequest request = MemoryCreateRequest.builder()
            .title("소중한 추억")
            .content("가족과 함께한 여행")
            .build();
            
        MemoryResponse response = MemoryResponse.builder()
            .id(1L)
            .title(request.getTitle())
            .content(request.getContent())
            .createdAt(LocalDateTime.now())
            .build();
            
        given(memoryService.createMemory(any(), any()))
            .willReturn(response);
        
        // When & Then
        mockMvc.perform(post("/api/memories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value(request.getTitle()))
            .andExpect(jsonPath("$.content").value(request.getContent()))
            .andDo(document("memory-create",
                requestFields(
                    fieldWithPath("title").description("추억 제목"),
                    fieldWithPath("content").description("추억 내용")
                ),
                responseFields(
                    fieldWithPath("id").description("추억 ID"),
                    fieldWithPath("title").description("추억 제목"),
                    fieldWithPath("content").description("추억 내용"),
                    fieldWithPath("createdAt").description("생성 일시")
                )
            ));
    }
}`
        }
      ],
      achievements: [
        {
          metric: "인프라 비용",
          before: "클라우드 월 $50+",
          after: "개인 서버 $0",
          improvement: "100% 절약",
          description: "개인 PC Linux 서버 구축 및 운영"
        },
        {
          metric: "파일 스토리지",
          before: "파일 시스템",
          after: "Minio 오브젝트 스토리지",
          improvement: "S3 호환성 확보",
          description: "확장 가능한 오브젝트 스토리지 구축"
        },
        {
          metric: "테스트 커버리지",
          before: "수동 테스트",
          after: "TDD 90%+",
          improvement: "자동화 달성",
          description: "JUnit5 기반 체계적 테스트 도입"
        },
        {
          metric: "API 문서화",
          before: "수동 관리",
          after: "자동 생성",
          improvement: "동기화 100%",
          description: "Spring REST DOCS 기반 테스트 연동 문서"
        }
      ],
      lessons: [
        {
          category: "DevOps & 인프라",
          points: [
            "개인 PC Ubuntu Server 구축 및 네트워크 설정 경험",
            "Docker Compose를 활용한 멀티 컨테이너 서비스 운영",
            "포트 포워딩과 방화벽 설정을 통한 안전한 서버 운영",
            "Minio 오브젝트 스토리지 구축 및 S3 호환 API 활용"
          ]
        },
        {
          category: "TDD & 테스트",
          points: [
            "Given-When-Then 패턴의 체계적인 테스트 작성법",
            "Spring REST DOCS를 활용한 테스트 기반 문서 자동화",
            "MockMvc와 JUnit5를 통한 API 통합 테스트 경험",
            "테스트 커버리지 90% 이상 달성을 통한 코드 품질 향상"
          ]
        },
        {
          category: "협업 & 문서화",
          points: [
            "API 문서 자동화로 팀 간 커뮤니케이션 효율성 증대",
            "테스트 코드와 문서의 동기화를 통한 신뢰성 확보",
            "Git Flow와 코드 리뷰를 통한 체계적 협업 프로세스"
          ]
        }
      ],
      improvements: [
        "Kubernetes 클러스터 구축으로 컨테이너 오케스트레이션 자동화",
        "Jenkins Pipeline을 통한 CI/CD 자동화 고도화",
        "Prometheus + Grafana 모니터링 시스템 구축",
        "Load Balancer 도입으로 고가용성 서버 아키텍처 구현"
      ]
    },
    contract4k: {
      title: "Contract4k(Contract for Kotlin)",
      subtitle: "계약에 의한 설계를 Kotlin DSL로 구현할 수 있도록 돕는 오픈소스 라이브러리",
      thumbnail: "/images/projects/contract4k/logo.png",
      duration: "2025.04.14 ~ 2025.05.22 (5주)",
      team: "백엔드 4명",
      role: "의존성 배포 및 컴파일 타임 위빙 설계",
      github: "https://github.com/BrokenFinger98/contract4k",
      demo: "#",
      overview: {
        background: "신뢰 할 수 있는 코드를 작성하고 싶다는 팀원들의 니즈가 있었고, 그중에 계약에 의한 설계(Design by Contract)라는 개념을 알게 되었습니다. 기존의 Guava, Contract4j와 같은 라이브러리들은 사전 조건만 제공한다던가, 컴파일 타임 안정성이 부족하다는 아쉬움이 있었습니다. 이를 해결하기 위해 Kotlin의 DSL 문법을 사용하여 사용자가 더욱 쉽게 계약에 의한 설계를 지키며 코드를 작성할 수 있는 라이브러리를 개발하고자 했습니다.",
        readme: `
# 설치

아래와 같이 Gradle 설정을 추가하면 Contract4K 라이브러리를 사용할 수 있습니다:

\`\`\`kotlin
plugins {
    kotlin("jvm") version "2.0.21"
    // AspectJ Post-Compile Weaving 플러그인
    id("io.freefair.aspectj.post-compile-weaving") version "8.4"
}

kotlin {
    jvmToolchain(21)
}

repositories {
    mavenCentral()
     // JitPack: GitHub에 호스팅된 라이브러리를 받아오기 위해 필요합니다.
    maven { url = uri("https://jitpack.io") }
}

dependencies {
    // Contract4K AOP weaving 의존성
    aspect("com.github.monorail-team:contract4k:v1.0.0")
    // AspectJ 런타임
    implementation("org.aspectj:aspectjrt:1.9.21")
    // Kotlin 리플렉션
    implementation(kotlin("reflect"))
}
\`\`\`

---

# 빠른 시작 (Quick Start)

\`\`\`kotlin
// 1) 도메인 모델
data class Order(val id: Long?, val amount: Int)

// 2) 계약서 정의
object ApproveOrderContract : Contract4KDsl<Pair<Order, Unit>, Order> {
  override fun validatePre(input: Pair<Order, Unit>) = conditions {
    "주문 금액은 1 이상이어야 합니다" means { input.first.amount >= 1 }
  }
}

// 3) 서비스 사용
class OrderService {
  @Contract4kWith(ApproveOrderContract::class)
  fun placeOrder(order: Order): Order = order
}

// 4) 실행 예시
fun main() {
  OrderService().placeOrder(Order(null, 0))
  // → Validation failed with 1 errors:
  //  - 주문 금액은 1 이상이어야 합니다
}
\`\`\`

---

# 핵심 개념

## Contract4KDsl 인터페이스

\`Contract4KDsl<I, O>\` 은 "계약서" 역할을 하는 DSL 진입점입니다.  
제네릭 파라미터:

- \`I\`: 메서드 호출 시점의 입력값 타입 (파라미터가 여러 개면 \`and\` 연산자를 사용해 묶음)
- \`O\`: 메서드 실행 결과 타입

주요 메서드:

\`\`\`kotlin
interface Contract4KDsl<I, O> {
  /** ① 사전(pre) 조건 검사 — 비즈니스 로직 실행 전 */
  fun validatePre(input: I)

  /** ② 불변식(invariant) 검사 — 로직 중에도 항상 지켜져야 할 조건 */
  fun validateInvariant(input: I, output: O)

  /** ③ 사후(post) 조건 검사 — 로직 실행 후 결과 검증 */
  fun validatePost(input: I, result: O)
}
\`\`\`

## @Contract4kWith 어노테이션

\`\`\`kotlin
@Service
class OrderService {
  @Contract4kWith(ApproveOrderContract::class)
  fun placeOrder(...) = …
}
\`\`\`

---

# DSL 사용법

Contract4K 의 핵심은 **"메시지" means { 조건 }** 형태의 Kotlin DSL 로 원하는 검증 로직을 깔끔하게 작성할 수 있다는 점입니다.  
아래처럼 **사전(pre)**, **불변(invariant)**, **사후(post)** 3단계로 나누어 블록 안에 조건을 선언하면, AOP 가 자동으로 해당 단계에서 실행해 줍니다.

## 사전/불변/사후 조건 정의

\`\`\`kotlin
object ApproveOrderContract : Contract4KDsl<Pair<Order, Customer>, Order> {

  // ① 사전(pre) 조건: 메서드 진입 직전에 실행
  override fun validatePre(input: Pair<Order, Customer>) = conditions {
    // 방법 1
    val (order, customer) = input
    "주문 객체는 null일 수 없습니다" means { order isNot nil }
    "고객 객체는 null일 수 없습니다" means { customer isNot nil }
    //방법 2
    "주문 객체는 null일 수 없습니다" means { input.first isNot nil }
    "고객 객체는 null일 수 없습니다" means { input.second isNot nil }
  }

  // ② 불변(invariant) 조건: 비즈니스 로직 중에도 유지되어야 할 제약
  override fun validateInvariant(input: Pair<Order, Customer>, output: Order) = conditions {
    "주문 ID는 항상 존재해야 합니다" means { output.id isNot nil }
  }

  // ③ 사후(post) 조건: 메서드 종료 후 최종 상태 검증
  override fun validatePost(input: Pair<Order, Customer>, result: Order) = conditions {
    "최종 상태는 COMPLETED 여야 합니다" means { result.status == "COMPLETED" }
  }
}
\`\`\`

---

# 조건 빌더 유틸리티

ConditionBuilder 에서 자주 쓰이는 주요 헬퍼 함수:

- **숫자 검사**
  - \`between(range: IntRange)\`
    \`\`\`kotlin
    order.amount between (1..10_000)
    \`\`\`
  - \`is positive\` / \`isNot negative\`
    \`\`\`kotlin
    count is positive
    balance isNot negative
    \`\`\`

- **컬렉션 검사**
  - \`hasCountInRange(range: IntRange)\`
    \`\`\`kotlin
    list hasCountInRange (1..5)
    \`\`\`
  - \`hasNoDuplicates()\`
    \`\`\`kotlin
    items hasNoDuplicates()
    \`\`\`
  - \`allSatisfy { predicate }\`
    \`\`\`kotlin
    users allSatisfy { it.isActive }
    \`\`\`

- **문자열 검사**
  - \`hasExactLength(length: Int)\`
    \`\`\`kotlin
    password hasExactLength 8
    \`\`\`
  - \`doesNotStartWith(prefix: String)\`
    \`\`\`kotlin
    token doesNotStartWith "ERR_"
    \`\`\`

- **날짜·시간 검사**
  - \`isBefore(other: Temporal)\`
    \`\`\`kotlin
    startDate isBefore endDate
    \`\`\`
  - \`isAfter(other: Temporal)\`
    \`\`\`kotlin
    dueDate isAfter now
    \`\`\`

---

# 예외 처리

- **\`ValidationException\`**
  - 계약(pre/invariant/post) 중 하나라도 실패하면 던져집니다.
  - \`RuntimeException\` 을 상속하며, 메시지에 어떤 조건이 왜 실패했는지 한눈에 보여 줍니다.
  - 예시:
    \`\`\`kotlin
    try {
      orderService.placeOrder(invalidOrder, customer)
    } catch (e: ValidationException) {
      println(e.message)
      // → Validation failed with 1 error:
      //    - 주문 금액은 1 이상이어야 합니다.
    }
    \`\`\`

- **ErrorCode**
  - 예외 메시지 안에서 \`[ERROR_CODE] 메시지\` 형태로 표시됩니다.
  - 사용자는 메시지만 보고도 "무슨 조건"이 "왜" 실패했는지 바로 알 수 있습니다.

---

# 고급 기능

## 1. 조건 그룹화 (OR / AND)

- **meansAnyOf { … }**  
  여러 조건 중 하나만 만족해도 OK인 그룹화
  \`\`\`kotlin
  conditions {
    meansAnyOf {
      "A 상품이 포함되어야 합니다" means { "A" in order.items }
      "B 상품이 포함되어야 합니다" means { "B" in order.items }
    }
  }
  \`\`\`

- **meansAllOf { … }**  
  모든 조건을 동시에 만족해야 하는 그룹화
  \`\`\`kotlin
  conditions {
    meansAllOf {
      "금액은 양수여야 합니다" means { order.amount > 0 }
      "고객 나이는 18세 이상이어야 합니다" means { customer.age >= 18 }
    }
  }
  \`\`\`

## 2. 공통 조건 묶음 재사용 (ConditionGroup)

자주 쓰이는 조건을 \`ConditionGroup\`으로 정의하고, 여러 계약서에서 재사용 가능

\`\`\`kotlin
object CommonCustomerConditions : ConditionGroup<Pair<Order, Customer>> {
  override fun apply(builder: ConditionBuilder, input: Pair<Order, Customer>) {
    val (_, customer) = input
    "고객 이름은 비어 있으면 안 됩니다" means { customer.name isNot nil}
    "고객 나이는 0 초과여야 합니다" means { customer.age > 0 }
  }
}

conditions {
  applyGroup(input, CommonCustomerConditions)
  // 추가 커스텀 조건...
}
\`\`\`

## 3. 경고 수준 조건 (softConditions)

예외가 아닌 **경고**로만 처리
\`\`\`kotlin
softConditions {
  "장기 미이용 고객입니다" means { daysSinceLastLogin > 365 }
}
\`\`\`

## 4. QuickFix 제안

조건에 수정 제안 추가
\`\`\`kotlin
conditions {
  "주문 금액은 1,000원 이상이어야 합니다"
    quickFix "금액을 1,000원 이상으로 설정하세요"
    means { order.amount >= 1_000 }
}
\`\`\`

## 5. 사용자 지정 에러 코드

\`means(code, message) { … }\` 또는 \`quickFix(code, message, fix) means { … }\` 사용

\`\`\`kotlin
conditions {
  means(
    code    = "ERR_INVALID_AMOUNT",
    message = "주문 금액은 1 이상이어야 합니다"
  ) { order.amount >= 1 }

  quickFix(
    code       = "ERR_NULL_ORDER",
    message    = "주문 객체는 null일 수 없습니다",
    fixMessage = "올바른 주문 객체를 전달하세요"
  ) means { order != null }
}
\`\`\``,
      },
      challenges: [
        {
          problem: "코드 삽입 방식의 기술적 선택과 성능 최적화",
          situation: "계약에 의한 설계 라이브러리에서 검증 코드를 메소드에 삽입하는 방법을 결정해야 했습니다. Spring DI를 활용한 프록시 방식과 KSP를 이용한 코드 생성 방식 중에서 고민했지만, 두 방식 모두 한계점이 있었습니다.",
          solution: "AspectJ 컴파일 타임 위빙 도입",
          implementation: [
            "Spring 의존성 제거로 순수 Kotlin 프로젝트에서도 사용 가능하도록 설계",
            "AspectJ Post-Compile Weaving을 통한 바이트코드 레벨 코드 삽입",
            "런타임 성능 저하 없이 컴파일 시점에 검증 로직 주입",
            "어노테이션 기반 AOP로 메소드와 계약 클래스 연결"
          ],
          result: "런타임 오버헤드 없이 컴파일 타임에 검증 코드 삽입 완료, Spring 의존성 제거로 범용성 확보"
        }
      ],
      techStack: {
        "Back-end": [
          { name: "Kotlin", version: "2.0.21", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
          { name: "AspectJ", version: "1.9.21", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"}
        ],
        "Tool": [
          { name: "Jitpack", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
        ]
      },
      codeExamples: [
        {
          title: "Contract4K DSL 기반 계약 정의",
          language: "kotlin",
          code: `// 도메인 모델
data class BankAccount(val id: String, var balance: Double)

// 계약 클래스 정의
object BankAccountContract : Contract4KDsl<Pair<BankAccount, Double>, BankAccount> {
    
    // 사전 조건: 메서드 실행 전 검증
    override fun validatePre(input: Pair<BankAccount, Double>) = conditions {
        val (account, amount) = input
        "계좌는 null일 수 없습니다" means { account isNot nil }
        "입금액은 0보다 커야 합니다" means { amount > 0 }
        "입금액은 1,000,000원 이하여야 합니다" means { amount <= 1_000_000 }
    }
    
    // 불변 조건: 메서드 실행 중 유지되어야 하는 조건
    override fun validateInvariant(input: Pair<BankAccount, Double>, output: BankAccount) = conditions {
        "계좌 잔액은 항상 0 이상이어야 합니다" means { output.balance >= 0 }
        "계좌 ID는 변경될 수 없습니다" means { output.id == input.first.id }
    }
    
    // 사후 조건: 메서드 실행 후 결과 검증
    override fun validatePost(input: Pair<BankAccount, Double>, result: BankAccount) = conditions {
        val (originalAccount, amount) = input
        "입금 후 잔액이 정확해야 합니다" means { 
            result.balance == originalAccount.balance + amount 
        }
    }
}`
        },
        {
          title: "AspectJ 위빙을 통한 자동 검증",
          language: "kotlin",
          code: `// 서비스 클래스에 계약 적용
class BankAccountService {
    
    @Contract4kWith(BankAccountContract::class)
    fun deposit(account: BankAccount, amount: Double): BankAccount {
        // 비즈니스 로직만 집중
        account.balance += amount
        return account
    }
}

// AspectJ Aspect 구현
@Aspect
class Contract4KAspect {
    
    @Around("@annotation(Contract4kWith)")
    fun enforceContract(joinPoint: ProceedingJoinPoint): Any? {
        val annotation = getContract4kWithAnnotation(joinPoint)
        val contractClass = annotation.value
        val contract = contractClass.objectInstance
        
        // 입력 파라미터 준비
        val args = joinPoint.args
        val input = when (args.size) {
            1 -> Pair(args[0], Unit)
            2 -> Pair(args[0], args[1])
            else -> args
        }
        
        // 사전 조건 검증
        contract?.validatePre(input)
        
        // 원본 메서드 실행
        val result = joinPoint.proceed()
        
        // 불변 조건 및 사후 조건 검증
        contract?.validateInvariant(input, result)
        contract?.validatePost(input, result)
        
        return result
    }
}`
        },
        {
          title: "DSL 헬퍼 함수 활용",
          language: "kotlin",
          code: `object ValidationContract : Contract4KDsl<User, User> {
    
    override fun validatePre(input: User) = conditions {
        // 문자열 검증
        "사용자 이름은 비어있을 수 없습니다" means { 
            input.name hasMinLength 1 
        }
        "이메일 형식이 올바르지 않습니다" means { 
            input.email matches emailRegex 
        }
        
        // 숫자 범위 검증
        "나이는 18세 이상이어야 합니다" means { 
            input.age is positive and (input.age >= 18) 
        }
        "나이는 120세 이하여야 합니다" means { 
            input.age between (1..120) 
        }
        
        // 컬렉션 검증
        "취미는 최소 1개 이상이어야 합니다" means { 
            input.hobbies hasCountInRange (1..10) 
        }
        "취미에 중복이 있으면 안됩니다" means { 
            input.hobbies hasNoDuplicates() 
        }
        
        // 조건부 검증
        meansAnyOf {
            "프리미엄 사용자이거나" means { input.isPremium }
            "또는 기본 사용자여야 합니다" means { !input.isPremium }
        }
    }
}`
        }
      ],
      lessons: [
        {
          category: "🧩 라이브러리 설계",
          points: [
            "Kotlin DSL 설계와 구현 방법 학습",
            "AspectJ를 활용한 AOP 프로그래밍 경험",
            "오픈소스 라이브러리 배포 및 관리 프로세스 이해"
          ]
        }
      ]
    },
    aicheck: {
      title: "aicheck(아이췤)",
      subtitle: "가족 안심 자녀 금융 지원 서비스",
      thumbnail: "/images/projects/aicheck/logo.png",
      duration: "2025.03.02 ~ 2025.04.11 (6주)",
      team: "백엔드 2명 (PL), 프론트 2명, AI 2명",
      role: "Back-End, Infra, PL",
      github: "https://github.com/BrokenFinger98/aicheck-back",
      demo: "#",
      demoVideo: "https://www.youtube.com/watch?v=pnFKBppBN68",
      overview: {
        background: "기록 기능을 넘어, 자녀의 소비 행동을 분석하고 학습 기회를 제공합니다. AI가 실시간 피드백을 통해 소비 습관 개선을 유도하며, 보이스피싱 및 스미싱 탐지를 통해 가족의 디지털 보안을 강화합니다. 금융 교육과 실생활 보안을 함께 고려한 가정용 AI 시스템입니다.",
        keyFeatures: [
          {
            title: "📊 용돈 리포트",
            description: [
              "월별/카테고리별 지출 패턴 시각화",
              "용돈 리포트 생성시 부모에게 알림 전송",
              "부모의 정기 용돈 지급 판단 기준 제공"
            ]
          },
          {
            title: "🧾 자동 용돈 기입장", 
            description: [
              "수입/지출 발생 시 자동 금액 입력",
              "자녀는 상세 내용만 작성하면 되는 간편한 기록 환경 제공"
            ]
          },
          {
            title: "🤖 엄마 AI (용돈 협상 AI)",
            description: [
              "살까 말까?: 소비 패턴을 분석해 충동구매 여부에 대해 조언",
              "추가 용돈 요청: AI에게 설득 → 성공 시 부모에게 용돈 인상 요청 메시지(대화 요약) 전송, 실패 시 ‘거절’ 피드백 제공",
              "설득 기준, 용돈 한도, 대화 스타일 등은 부모가 자유롭게 커스터마이징 가능"
            ]
          },
          {
            title: "🕵️‍♂️ 보이스피싱 탐지",
            description: [
              "통화 발생 시 이상한 대화가 진행된다거나 모르는 번호로 전화가 온 경우, 통화 녹음 버튼을 통해 감지 시작",
              "딥페이크 음성 + 통화 스크립트 기반 AI 분석",
              "의심 정황 포착 시 자녀와 가족 모두에게 실시간 알림 제공",
            ]
          },
          {
            title: "🛡️ 스미싱 방지",
            description: [
              "문자 내 URL 자동 분석",
              "악성 URL 감지 시 경고 알림 전송 및 클릭 차단 유도"
            ]
          }
        ]
      },
      components: {
        "Business Service": {
          description: "핵심 비즈니스 로직을 담당하는 중앙 서비스",
          responsibilities: [
            "용돈 관리 및 협상 로직 처리",
            "거래 기록 저장 및 분석",
            "보이스피싱/스미싱 탐지 데이터 관리",
            "사용자 인증 및 권한 관리"
          ],
          keyComponents: [
            {
              name: "AllowanceService",
              description: "용돈 요청/승인 처리 및 리포트 생성",
              methods: ["getAllowanceRequests()", "updateAllowanceRequestResponse()", "getAllowanceSummary()"]
            },
            {
              name: "TransactionRecordService", 
              description: "거래 내역 관리 및 카테고리별 분석",
              methods: ["getTransactionRecords()", "getCalendarData()", "getDescriptionRatio()"]
            },
            {
              name: "VoicePhishingService",
              description: "보이스피싱 탐지 결과 저장 및 조회",
              methods: ["registerVoicePhishing()", "getPhishingHistory()"]
            },
            {
              name: "BadUrlService",
              description: "악성 URL 관리 및 스미싱 차단",
              methods: ["saveBadUrl()", "checkBadUrl()"]
            }
          ],
          entities: [
            "VoicePhishing (보이스피싱 탐지 결과)",
            "BadUrl (악성 URL 정보)",
            "TransactionRecord (거래 기록)",
            "Allowance (용돈 요청/승인)"
          ]
        },
        "Chatbot Service": {
          description: "AI 엄마와의 대화형 인터페이스 서비스",
          responsibilities: [
            "용돈 협상 대화 처리",
            "금융 상담 챗봇 운영",
            "Redis 기반 대화 세션 관리",
            "AI 서버와의 통신 중계"
          ],
          keyComponents: [
            {
              name: "ChatbotController",
              description: "채팅 세션 시작/종료 및 메시지 처리 API",
              methods: ["startChat()", "sendPersuadeChat()", "sendQuestionChat()", "endChat()"]
            },
            {
              name: "ChatbotService",
              description: "AI 서버 통신 및 설득 로직 처리",
              methods: ["sendPersuadeChat()", "sendQuestionChat()", "startChat()"]
            },
            {
              name: "RedisService",
              description: "대화 이력 및 사용자 맞춤 설정 관리",
              methods: ["loadChatHistory()", "appendChatHistory()", "loadCustomSetting()"]
            }
          ],
          integrations: [
            "FastAPI AI 서버 (자연어 처리)",
            "Business Service (거래 정보 조회)",
            "Batch Service (정기 용돈 정보)",
            "Alarm Service (협상 성공 알림)"
          ]
        },
        "Bank Service": {
          description: "은행 API 연동 및 금융 거래 처리 서비스",
          responsibilities: [
            "은행 계좌 연동 및 관리",
            "송금 및 이체 처리",
            "사용자 계좌 인증",
            "거래 내역 동기화"
          ],
          keyComponents: [
            {
              name: "AccountController",
              description: "계좌 생성, 조회, 잔액 관리 API",
              methods: ["createAccount()", "getAccountInfo()", "getBalance()"]
            },
            {
              name: "TransferController", 
              description: "계좌 간 송금 및 이체 처리",
              methods: ["transfer()", "getTransferHistory()"]
            },
            {
              name: "MemberController",
              description: "은행 사용자 등록 및 인증",
              methods: ["registerMember()", "authenticateMember()"]
            }
          ],
          entities: [
            "Account (계좌 정보)",
            "Transfer (송금 내역)",
            "Member (은행 사용자 정보)"
          ]
        },
        "Alarm Service": {
          description: "FCM 기반 실시간 푸시 알림 서비스",
          responsibilities: [
            "Firebase FCM 푸시 알림 전송",
            "알림 전송 실패 시 재시도 처리",
            "Kafka 이벤트 기반 알림 처리",
            "사용자별 알림 이력 관리"
          ],
          keyComponents: [
            {
              name: "FCMNotificationSender",
              description: "Firebase 메시지 전송 담당",
              methods: ["send()", "validateToken()"]
            },
            {
              name: "KafkaAlarmConsumer",
              description: "Kafka 알림 이벤트 소비 및 처리",
              methods: ["onMessage()", "onRetryMessage()"]
            },
            {
              name: "AlarmService",
              description: "알림 내역 저장 및 조회 서비스",
              methods: ["saveAlarm()", "getAlarms()", "readAlarm()", "deleteAlarm()"]
            }
          ],
          features: [
            "Retry Topic 패턴으로 전송 실패 자동 재시도",
            "최대 3회 재시도 후 실패 로그 기록",
            "FCM 토큰 유효성 검사 및 갱신"
          ]
        }
      },
      challenges: [
        {
          problem: "FCM 알림 서버 장애 시 전송 실패 및 시스템 안정성 저하",
          situation: "실제 알림 서버가 일시적으로 내려가면 알림 요청이 누락되거나 서비스 스레드가 대기/실패하며 장애가 전파되는 문제가 발생했습니다.",
          solution: "Kafka 재시도 전용 토픽(alarm-retry)과 메시지 내 재시도 횟수로 최대 3회 재시도",
          implementation: [
            "메인 토픽(alarm) 처리 중 FCMException 발생 시 AlarmRetryEventMessage로 alarm-retry 토픽 전송",
            "AlarmRetryEventMessage.nextRetry()로 retryCount 증가, 재시도 횟수 메시지에 내장",
            "AlarmRetryEventListener에서 MAX_RETRY_COUNT(3) 도달 시 재시도 중단",
            "수동 ack(AckMode.MANUAL)로 실패 건도 중복 처리 없이 안전하게 종료"
          ],
          result: "일시 장애 시 재시도로 복구 가능, 무한 재시도 방지로 운영 안정성 확보"
        },
        {
          problem: "AI 챗봇 컨텍스트 전달로 인한 지연과 DB 부하",
          situation: "맞춤형 응답 생성을 위해 매 대화마다 사용자 컨텍스트와 개인정보를 AI 서버에 전달해야 했고, DB 조회 기반 구현은 응답 지연과 DB 부하를 초래했습니다.",
          solution: "RedisTemplate 기반 세션 캐시로 컨텍스트 저장/조회",
          implementation: [
            "chat:setting:{childId} 키에 CustomSetting을 opsForValue로 저장/로드",
            "chat:history:{chatType}:{childId} 키에 대화 이력을 List(opsForList.rightPush)로 순서 보장 저장",
            "대화 종료 시 clearChatSession으로 관련 키 일괄 삭제",
            "필요 데이터만 메모리 적재하여 DB 조회 최소화"
          ],
          result: "컨텍스트 조회 지연을 수백 ms → 수십 ms로 감소, DB 조회 빈도 대폭 축소"
        },
        {
          problem: "CloudFront 캐싱으로 Next.js 동적 페이지 최신성 저하",
          situation: "정적 컨텐츠를 S3+CloudFront로 배포해 초기 로딩 성능은 개선됐지만, SSR/ISR 페이지가 캐싱되며 동적 반영 지연과 불일치 문제가 발생했습니다.",
          solution: "정적 자원만 S3 제공, Next.js는 EC2/Nginx로 직접 서빙",
          implementation: [
            "GitLab + Jenkins로 BE/FE 빌드·배포 파이프라인 구성",
            "정적 파일은 S3 업로드, CloudFront 대상에서 동적 경로 제외",
            "Next.js 서버는 EC2에서 Nginx 리버스 프록시로 운영",
            "캐시 무효화 및 롤백 전략 수립으로 배포 안정성 강화"
          ],
          result: "초기 로딩 성능을 유지하면서 동적 페이지 최신성 문제 해결"
        }
      ],
      techStack: {
        "Back-end": [
          { name: "Java", version: "17", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Spring Boot", version: "3.4.1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "Spring Data JPA", version: "", icon: "https://spring.io/img/projects/spring-data.svg" },
          { name: "Spring JDBC", version: "", icon: "https://spring.io/img/projects/spring-data.svg" },
          { name: "Spring Cloud", version: "", icon: "https://spring.io/img/projects/spring-cloud.svg" },
          { name: "Spring Security", version: "", icon: "https://spring.io/img/projects/spring-security.svg" },
          { name: "QueryDSL", version: "", icon: "https://cdn.inflearn.com/public/files/courses/328989/c1b5cabc-03f0-4cd8-9f98-8ec0e2f42378/329248-4.png" },
          { name: "OAuth 2.0", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg" },
          { name: "WebSocket", version: "", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqWz7aMlinMNdeQ2i5p8ITrqe9f81e9W_xA&s" },
          { name: "Apache Kafka", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
          { name: "RabbitMQ", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" }
        ],
        "Front-end": [
          { name: "React", version: "19", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Next.js", version: "15.2.4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
          { name: "TypeScript", version: "5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
          { name: "Tailwind CSS", version: "4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
          { name: "Zustand", version: "5.0.3", icon: "https://github.com/pmndrs/zustand/raw/main/docs/bear.jpg" },
          { name: "Nginx", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" }
        ],
        "Database": [
          { name: "MySQL", version: "8.0", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
          { name: "MongoDB", version: "6.0", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg" },
          { name: "Redis", version: "7.0", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
        ],
        "Infrastructure": [
          { name: "Docker", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          { name: "AWS EC2", version: "", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
          { name: "AWS S3", version: "", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
          { name: "Jenkins", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" }
        ]
      },
      codeExamples: [
        {
          title: "Kafka 재시도 토픽 + 수동 Ack 처리",
          language: "java",
          code: `@Slf4j
@Component
@RequiredArgsConstructor
public class AlarmEventListener {
    private final AlarmService alarmService;
    private final FCMTokenService fcmTokenService;
    private final NotificationSender notificationSender;
    private final AlarmRetryEventProducer producer;
    @KafkaListener(
        topics = "alarm",
        groupId = "alarm-group",
        containerFactory = "kafkaListenerContainerFactory"
    )
    public void onMessage(final AlarmEventMessage message, final Acknowledgment ack) {
        String token = null;
        try {
            alarmService.saveAlarm(message);
            token = fcmTokenService.getFCMToken(message.memberId());
            notificationSender.send(token, message.title(), message.body());
            ack.acknowledge();
        } catch (FCMException e) {
            log.warn("[FCM 전송 실패 - 재시도 요청] memberId={}, title={}, reason={}",
                message.memberId(), message.title(), e.getMessage(), e);
            producer.sendRetryMessage(AlarmRetryEventMessage.from(message, token));
            ack.acknowledge();
        }
    }
}
@Slf4j
@Component
@RequiredArgsConstructor
public class AlarmRetryEventListener {
    private static final int MAX_RETRY_COUNT = 3;
    private final NotificationSender notificationSender;
    private final AlarmRetryEventProducer retryEventProducer;
    @KafkaListener(
        topics = "alarm-retry",
        groupId = "alarm-retry-group",
        containerFactory = "retryKafkaListenerContainerFactory"
    )
    public void onRetryMessage(final AlarmRetryEventMessage message, final Acknowledgment ack) {
        if (message.retryCount() >= MAX_RETRY_COUNT) {
            log.error("[최대 재시도 초과] token={}, title={}, retryCount={}",
                message.token(), message.title(), message.retryCount());
            ack.acknowledge();
            return;
        }
        try {
            notificationSender.send(message.token(), message.title(), message.body());
            ack.acknowledge();
        } catch (FCMException e) {
            log.warn("[FCM 재시도 실패] token={}, retryCount={}, reason={}",
                message.token(), message.retryCount(), e.getMessage(), e);
            retryEventProducer.sendRetryMessage(message);
            ack.acknowledge();
        }
    }
}`
        },
        {
          title: "재시도 메시지 모델과 프로듀서",
          language: "java",
          code: `@Builder
public record AlarmRetryEventMessage(
    String token,
    String title,
    String body,
    int retryCount
) {
    public static AlarmRetryEventMessage from(final AlarmEventMessage message, final String token) {
        return AlarmRetryEventMessage.builder()
            .token(token)
            .title(message.title())
            .body(message.body())
            .retryCount(0)
            .build();
    }
    public AlarmRetryEventMessage nextRetry() {
        return AlarmRetryEventMessage.builder()
            .token(token)
            .title(title)
            .body(body)
            .retryCount(retryCount + 1)
            .build();
    }
}
@Component
@RequiredArgsConstructor
public class AlarmRetryEventProducer {
    private static final String RETRY_TOPIC = "alarm-retry";
    private final KafkaTemplate<String, AlarmRetryEventMessage> kafkaTemplate;
    public void sendRetryMessage(final AlarmRetryEventMessage message) {
        kafkaTemplate.send(RETRY_TOPIC, message.nextRetry());
    }
}`
        },
        {
          title: "Kafka Listener 수동 Ack 설정",
          language: "java",
          code: `@EnableKafka
@Configuration
public class KafkaConsumerConfig {
    @Value("\${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;
    private <T> ConcurrentKafkaListenerContainerFactory<String, T> factory(final String groupId, final Class<T> clazz) {
        var factory = new ConcurrentKafkaListenerContainerFactory<String, T>();
        factory.setConsumerFactory(consumerFactory(groupId, clazz));
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL);
        return factory;
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AlarmEventMessage> kafkaListenerContainerFactory() {
        return factory("alarm-group", AlarmEventMessage.class);
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AlarmRetryEventMessage> retryKafkaListenerContainerFactory() {
        return factory("alarm-retry-group", AlarmRetryEventMessage.class);
    }
}`
        },
        {
          title: "Redis 세션 컨텍스트와 대화 이력 관리",
          language: "java",
          code: `@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {
    private static final String SETTING_KEY_PREFIX = "chat:setting:";
    private static final String HISTORY_KEY_PREFIX = "chat:history:";
    private final RedisTemplate<String, CustomSetting> customSettingRedisTemplate;
    private final RedisTemplate<String, ChatNode> chatNodeRedisTemplate;
    public void prepareChatSession(Long childId, ChatType chatType, CustomSetting setting) {
        customSettingRedisTemplate.opsForValue().set(SETTING_KEY_PREFIX + childId, setting);
    }
    public void clearChatSession(Long childId, ChatType chatType) {
        customSettingRedisTemplate.delete(SETTING_KEY_PREFIX + childId);
        chatNodeRedisTemplate.delete(HISTORY_KEY_PREFIX + chatType.name() + ":" + childId);
    }
    public void appendChatHistory(Long childId, ChatType chatType, AIMessage ai, MemberMessage member) {
        String key = HISTORY_KEY_PREFIX + chatType.name() + ":" + childId;
        chatNodeRedisTemplate.opsForList().rightPush(key, ChatNode.from(member));
        chatNodeRedisTemplate.opsForList().rightPush(key, ChatNode.from(ai));
    }
    public CustomSetting loadCustomSetting(Long childId) {
        return customSettingRedisTemplate.opsForValue().get(SETTING_KEY_PREFIX + childId);
    }
    public List<ChatNode> loadChatHistory(Long childId, ChatType chatType) {
        return chatNodeRedisTemplate.opsForList().range(HISTORY_KEY_PREFIX + chatType.name() + ":" + childId, 0, -1);
    }
}`
        }
      ],
      achievements: [
        {
          metric: "알림 안정성",
          before: "장애 시 전송 누락/실패",
          after: "최대 3회 재시도",
          improvement: "재처리 성공률 향상",
          description: "Kafka 재시도 토픽(alarm-retry) + retryCount 기반 재시도"
        },
        {
          metric: "챗봇 컨텍스트 조회",
          before: "매 요청 DB 조회",
          after: "Redis 세션 캐시 조회",
          improvement: "DB 부하 감소, 응답 지연 단축",
          description: "사용자별 세션 키/TTL 기반 컨텍스트 캐싱"
        },
        {
          metric: "동적 페이지 최신성",
          before: "CloudFront 캐싱으로 반영 지연",
          after: "EC2/Nginx 직접 서빙",
          improvement: "최신성 확보",
          description: "정적은 S3, 동적은 서버 직접 서빙으로 분리"
        }
      ],
      lessons: [
        {
          category: "운영 안정성",
          points: [
            "재시도 전용 토픽과 재시도 상한(3회)의 효과",
            "수동 ack로 실패 건 중복 처리 방지와 격리",
            "장애 전파를 막는 이벤트 드리븐 아키텍처"
          ]
        },
        {
          category: "캐시 설계",
          points: [
            "RedisTemplate로 컨텍스트/대화 이력 분리 저장(Value/List)",
            "명시적 세션 종료 시 키 삭제 및 일관성 유지",
            "DB 부하 절감과 응답 시간 단축 경험"
          ]
        },
        {
          category: "배포/캐싱 전략",
          points: [
            "CDN 캐싱과 SSR/ISR의 상호작용 이해",
            "정적·동적 자원 분리 배포의 필요성",
            "롤백·캐시 무효화 전략 수립의 중요성"
          ]
        }
      ],
      improvements: [
        "알림 재시도 간격을 조금씩 늘려 서버 부담 줄이기",
        "재시도에도 실패한 알림은 모아두고 관리자에게 알려 빠르게 대응하기",
        "Redis 저장 기간과 대화 개수에 제한을 두어 메모리 절약하기",
        "대화 이력과 설정을 주기적으로 DB에 백업하기",
        "이미지·CSS 같은 정적 파일만 CDN에 올리고, 동적 화면은 서버에서 제공 유지하기"
      ],
      images: {
        gallery: [
          {
            src: "/images/projects/aicheck/용돈인상요청.gif",
            alt: "용돈 리포트",
            title: "용돈 리포트"
          },
          {
            src: "/images/projects/aicheck/엄마AI.gif",
            alt: "엄마AI",
            title: "엄마AI"
          },
          {
            src: "/images/projects/aicheck/보이스피싱.gif",
            alt: "보이스피싱",
            title: "보이스피싱"
          },
          {
            src: "/images/projects/aicheck/스미싱.gif",
            alt: "스미싱",
            title: "스미싱"
          },
          {
            src: "/images/projects/aicheck/용돈기입장.gif",
            alt: "용돈 기입장", 
            title: "용돈 기입장",
            size: "small"
          }
        ],
        architecture: [
          {
            src: "/images/projects/aicheck/architecture.png",
            alt: "MSA 아키텍처 다이어그램",
            title: "마이크로서비스 아키텍처"
          }
        ],
        erd: [
          {
            src: "/images/projects/aicheck/erd_bank.png",
            alt: "은행 관련 ERD",
            title: "은행 시스템 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_ai.png", 
            alt: "AI 관련 ERD",
            title: "AI 시스템 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_business.png",
            alt: "비즈니스 로직 ERD",
            title: "비즈니스 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_notification.png",
            alt: "알림 시스템 ERD", 
            title: "알림 ERD"
          },
          {
            src: "/images/projects/aicheck/erd_record.png",
            alt: "거래 기록 ERD",
            title: "거래 기록 ERD"
          }
        ]
      }
    },
    ceonsun: {
      title: "개과천선(개발자 과외는 천선)",
      subtitle: "개발자와 수강생 간의 실시간 과외 매칭 플랫폼",
      thumbnail: "/images/projects/ceonsun/logo.png",
      duration: "2025.01.13 ~ 2025.02.21 (6주)",
      team: "백엔드 4명, 프론트 1명",
      role: "Back-End",
      github: "https://github.com/BrokenFinger98/SSAFY-ceon-sun",
      demo: "#",
      components: {
        "Class Service": {
          description: "강의 수업 및 소스코드 관리를 담당하는 핵심 서비스",
          responsibilities: [
            "강의 수업 소스코드 업로드/다운로드",
            "수업 기록 및 이력 관리",
            "계약된 강의 상태 업데이트",
            "페이징 기반 데이터 조회 처리"
          ],
          keyComponents: [
            {
              name: "ClassController",
              description: "강의 관련 API 엔드포인트 제공",
              methods: ["uploadSourceCode()", "downloadSourceCode()", "searchSourceCodes()", "searchLessonRecords()", "updateStatus()"]
            },
            {
              name: "ClassService",
              description: "강의 비즈니스 로직 처리",
              methods: ["saveSourceCode()", "searchSourceCode()", "searchSourceCodes()", "searchLessonRecords()"]
            }
          ],
          entities: [
            "ContractedClass (계약된 강의)",
            "SourceCode (소스코드)",
            "LessonRecord (수업 기록)"
          ]
        },
        "Chat Service": {
          description: "실시간 채팅 기능을 제공하는 서비스",
          responsibilities: [
            "WebSocket 기반 실시간 채팅",
            "MongoDB를 활용한 채팅 메시지 저장",
            "채팅방별 메시지 이력 관리",
            "Kafka를 통한 메시지 이벤트 처리"
          ],
          keyComponents: [
            {
              name: "ChatController",
              description: "채팅 메시지 조회 API 제공",
              methods: ["getChatMessage()"]
            },
            {
              name: "MessageController", 
              description: "실시간 메시지 전송 처리",
              methods: ["sendMessage()", "handleMessage()"]
            },
            {
              name: "ChatRoomController",
              description: "채팅방 관리 및 운영",
              methods: ["createChatRoom()", "joinChatRoom()", "leaveChatRoom()"]
            },
            {
              name: "ChatMessageService",
              description: "채팅 메시지 비즈니스 로직",
              methods: ["findByRoomId()", "saveMessage()"]
            }
          ],
          integrations: [
            "MongoDB (메시지 저장소)",
            "Kafka Consumer (메시지 이벤트 처리)",
            "WebSocket (실시간 통신)"
          ]
        },
        "Payment Service": {
          description: "결제 검증 및 이력 관리 서비스",
          responsibilities: [
            "결제 요청 검증 및 승인",
            "사용자별 결제 내역 관리",
            "페이징 기반 결제 이력 조회",
            "결제 상태 추적 및 관리"
          ],
          keyComponents: [
            {
              name: "PaymentController",
              description: "결제 관련 API 엔드포인트",
              methods: ["validatePayment()", "searchPayments()"]
            },
            {
              name: "PaymentService",
              description: "결제 검증 및 처리 로직",
              methods: ["validatePayment()", "searchPaymentsByMemberId()"]
            }
          ],
          entities: [
            "Payment (결제 정보)",
            "PaymentHistory (결제 이력)",
            "PaymentStatus (결제 상태)"
          ]
        },
        "Notification Service": {
          description: "실시간 알림 및 이벤트 처리 서비스",
          responsibilities: [
            "Kafka 기반 비동기 알림 처리",
            "SSE를 통한 실시간 알림 전송",
            "사용자별 알림 읽음 상태 관리",
            "쿠폰 및 시스템 알림 발송"
          ],
          keyComponents: [
            {
              name: "NotificationController",
              description: "알림 관련 API 제공",
              methods: ["sendNotification()", "sendCouponNotificationToAllUsers()", "getAllNotifications()", "hasUnreadNotifications()", "getNotificationDetail()"]
            },
            {
              name: "SseController",
              description: "Server-Sent Events 기반 실시간 알림",
              methods: ["streamNotifications()", "subscribeNotifications()"]
            },
            {
              name: "NotificationProducerService",
              description: "Kafka 알림 이벤트 발행",
              methods: ["sendNotification()"]
            },
            {
              name: "NotificationService",
              description: "알림 비즈니스 로직 처리",
              methods: ["sendCouponNotificationToAllUsers()", "getAllNotificationsOrdered()", "hasUnreadNotifications()", "markNotificationAsRead()"]
            }
          ],
          features: [
            "WebFlux 기반 비동기 처리",
            "Kafka Producer/Consumer 패턴",
            "SSE 실시간 알림 스트리밍",
            "읽음 처리 자동화"
          ]
        },
        "Ranking Service": {
          description: "강사 랭킹 시스템을 위한 실시간 데이터 처리 서비스",
          responsibilities: [
            "Redis를 활용한 실시간 랭킹 데이터 관리",
            "강사 조회수 및 수업 횟수 집계",
            "가중치 기반 랭킹 점수 계산",
            "배치 작업을 통한 DB-Redis 동기화"
          ],
          keyComponents: [
            {
              name: "RankingController",
              description: "랭킹 관련 API 및 배치 작업 제어",
              methods: ["incrementTeacherViewCount()", "incrementTeacherClassCount()", "mergeRealTimeData()", "updateDatabaseRankingPoints()", "syncRedisRankingPoints()", "getTeachersRank()"]
            },
            {
              name: "RankingService",
              description: "랭킹 계산 및 데이터 동기화 로직",
              methods: ["incrementTeacherViewCount()", "incrementTeacherClassCount()", "mergeRealTimeData()", "updateDatabaseRankingPoints()", "syncRedisRankingPoints()", "getTeachersRank()"]
            }
          ],
          features: [
            "Redis ZSet을 활용한 실시간 랭킹",
            "3시간 단위 실시간 데이터 병합", 
            "24시간 단위 DB-Redis 동기화",
            "가중치 기반 랭킹 점수 산출"
          ]
        },
        "Coupon Service": {
          description: "쿠폰 발급 및 관리 서비스",
          responsibilities: [
            "쿠폰 생성 및 발급",
            "사용자별 쿠폰 사용 이력 관리",
            "Kafka를 통한 쿠폰 알림 이벤트 발행",
            "쿠폰 유효성 검증"
          ],
          keyComponents: [
            {
              name: "CouponController",
              description: "쿠폰 관련 API 엔드포인트",
              methods: ["issueCoupon()", "useCoupon()", "getCouponHistory()"]
            },
            {
              name: "CouponKafkaService",
              description: "쿠폰 관련 Kafka 이벤트 처리",
              methods: ["sendCouponNotification()", "processCouponEvent()"]
            }
          ],
          integrations: [
            "Notification Service (쿠폰 알림)",
            "Kafka (이벤트 처리)"
          ]
        }
      },
      overview: {
        background: "코로나19 이후 온라인 교육 수요가 급증하면서, 다양한 과외 매칭 플랫폼이 만들어졌습니다. 대부분 다양한 종류의 과외에 대한 서비스들였기 때문에, 개발자에 특화된 과외 매칭 플랫폼을 만들고 싶었습니다.",
        keyFeatures: [
          {
            title: "🔐 로그인",
            description: [
              "Kakao 소셜 로그인을 이용한 간편한 회원가입 및 로그인"
            ]
          },
          {
            title: "🎓 학생",
            description: [
              "학생 소개글 작성을 통해 본인이 수강하기 원하는 카테고리 설정 가능",
              "카테고리, 성별, 나이를 필터로 하는 선생 검색 기능 제공",
              "과외 문의하기 버튼을 통해 선생에게 과외 문의",
              "수업 신청을 요청 받고, 결제를 통해 수강 횟수 구매"
            ]
          },
          {
            title: "👩‍🏫 선생",
            description: [
              "선생 소개글 작성을 통해 본인이 수업 가능한 카테고리 설정 가능",
              "과외 문의를 보낸 학생과 채팅으로 대화 후, 수업 신청 기능 제공"
            ]
          },
          {
            title: "💬 채팅",
            description: [
              "학생과 선생의 1:1 실시간 채팅을 통해 과외 문의 및 과외 일정 조정 기능 제공",
            ]
          },
          {
            title: "🔔 알림",
            description: [
              "채팅, 쿠폰 발급 이벤트, 과외 등 다양한 알림을 실시간으로 제공",
            ]
          },
          {
            title: "🎟️ 쿠폰",
            description: [
              "선착순 쿠폰 발급 이벤트 제공",
              "발급받은 쿠폰을 이용해 수강권 결제 금액 할인"
            ]
          },
          {
            title: "💳 결제",
            description: [
              "포트원 API를 이용한 테스트 결제 기능 구현"
            ]
          },
          {
            title: "🏆 랭킹",
            description: [
              "선생 랭킹을 통해 학생들에게 더 많은 노출 기회 제공"
            ]
          }
        ]
      },
      challenges: [
        {
          problem: "대규모 트래픽 상황(동시 접속)에서 안정적으로 작동하는 선착순 쿠폰 발급 이벤트 기능 구현",
          situation: "단순 Write/Update, DB Pessimistic Lock으로 구현 -> 대규모 트래픽을 버티기에 성능이 부족",
          solution: "Redis 재고 및 발급 중복 관리 + Kafka 이벤트 처리 조합",
          implementation: [
            "쿠폰 발급 관리와 DB Write 작업을 분리",
            "Redis로 재고 및 발급 중복 관리",
            "Kafka를 통해 비동기로 DB 저장 처리",
            "JDBC Bulk Insert 활용하여 일정 건수(최대 1000건)까지 쌓은 뒤 일괄 Insert",
          ],
          result: "처리 성능 3.4배 향상 (285 TPS → 966 TPS), 사용자 응답 속도 향상"
        },
      ],
      techStack: {
        "Back-end": [
          { name: "Java", version: "17", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Spring Boot", version: "3.4.1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "Spring Data JPA", version: "", icon: "https://spring.io/img/projects/spring-data.svg" },
          { name: "Spring JDBC", version: "", icon: "https://spring.io/img/projects/spring-data.svg" },
          { name: "QueryDSL", version: "", icon: "https://cdn.inflearn.com/public/files/courses/328989/c1b5cabc-03f0-4cd8-9f98-8ec0e2f42378/329248-4.png" },
          { name: "Spring Cloud", version: "", icon: "https://spring.io/img/projects/spring-cloud.svg" },
          { name: "Spring Security", version: "", icon: "https://spring.io/img/projects/spring-security.svg" },
          { name: "OAuth 2.0", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-original.svg" },
          { name: "WebSocket", version: "", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwqWz7aMlinMNdeQ2i5p8ITrqe9f81e9W_xA&s" },
          { name: "Kafka", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
          { name: "RabbitMQ", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" }
        ],
        "Front-end": [
          { name: "React", version: "19", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "HTML5", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS3", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
        ],
        "Database / Cache": [
          { name: "MySQL", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
          { name: "MongoDB", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg" },
          { name: "Redis", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
        ],
        "Infra": [
          { name: "Docker", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          { name: "AWS EC2", version: "", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
          { name: "AWS S3", version: "", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
          { name: "Jenkins", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" }
        ]
      },
      codeExamples: [
        {
          title: "쿠폰 재고 및 중복 발급 관리",
          language: "java",
          code: 
`// 쿠폰 이벤트 생성 및 쿠폰 발급 요청을 처리하는 Service Class
@RequiredArgsConstructor
@Service
public class CouponServiceImpl implements CouponService {

	private final CouponKafkaClient couponKafkaClient;
	private final NotificationClient notificationClient;
	private final RedisService redisService;
	private final KafkaProducerService kafkaProducerService;

	@Override
	public CreateCouponServiceResponse createCoupon(final CreateCouponServiceRequest request) {
		final CreateCouponFeignResponse feignResponse = couponKafkaClient.createCoupon(
			toCreateCouponFeignRequest(request));
		final CreateCouponServiceResponse response = toCreateCouponServiceResponse(feignResponse);
		try {
			redisService.saveCouponInfo(toCouponCreateRedis(response));
		} catch (BusinessException e) {
			couponKafkaClient.cancelCoupon(response.couponId());
			throw e;
		}
		notificationClient.sendNotification(makeMessage(request));
		return response;
	}

	private NotificationRequestDto makeMessage(final CreateCouponServiceRequest request) {
		return new NotificationRequestDto(
			String.format("%s%%의 할인율을 가진 %s이 %s개 발급 가능합니다.",
				request.discountRate(), request.name(), request.totalQuantity()));
	}

	@Override
	public void issueCoupon(final IssueCouponServiceRequest request) {
		redisService.issueCoupon(toCouponIssueRedis(request));
		kafkaProducerService.sendCouponIssuedEvent(toIssueCouponRecord(request));
	}
}

// 쿠폰 이벤트 발생시 쿠폰 생성 및 쿠폰 발급 요청시 쿠폰 발급 처리하는 Service Class 
@Slf4j
@RequiredArgsConstructor
@Service
public class RedisServiceImpl implements RedisService {

	private final RedisTemplate<String, Object> redisTemplate;

  // 쿠폰 이벤트 발생시 쿠폰 생성 
	@Override
	public void saveCouponInfo(final CouponCreateRedis couponCreateRedis) {
		final String couponInfoKey = "coupon:info:" + couponCreateRedis.couponId();
		final String couponRemainKey = "coupon:remain:" + couponCreateRedis.couponId();
		final String issuedUsersKey = "coupon:issued:" + couponCreateRedis.couponId();
		final Integer totalQuantity = couponCreateRedis.totalQuantity();
		final CouponInfoValue couponInfoValue = toCouponInfoValue(couponCreateRedis);

		final List<Object> txResults = redisTemplate.execute(new SessionCallback<List<Object>>() {
			@Override
			public List<Object> execute(final RedisOperations operations) throws DataAccessException {
				operations.multi();
				operations.opsForValue().set(couponRemainKey, totalQuantity, couponCreateRedis.validDays(), DAYS);
				operations.expire(issuedUsersKey, couponCreateRedis.validDays(), DAYS);
				operations.opsForValue().set(couponInfoKey, couponInfoValue, couponCreateRedis.validDays(), DAYS);
				return operations.exec();
			}
		});

		validateSaveTransaction(couponRemainKey, issuedUsersKey, couponInfoKey, txResults);
	}

	private void validateSaveTransaction(
		final String couponRemainKey,
		final String issuedUsersKey,
		final String couponInfoKey,
		final List<Object> txResults) {

		if (txResults == null || txResults.isEmpty() || txResults.size() < 3) {
			rollbackSaveTransaction(couponRemainKey, issuedUsersKey, couponInfoKey);
			throw new BusinessException(REDIS_SAVE_FAILED);
		}
	}

	private void rollbackSaveTransaction(
		final String couponRemainKey,
		final String issuedUsersKey,
		final String couponInfoKey) {

		try {
			redisTemplate.delete(couponRemainKey);
			redisTemplate.delete(issuedUsersKey);
			redisTemplate.delete(couponInfoKey);
		} catch (final Exception e) {
			log.error(e.getMessage(), e);
		}
	}

  // 쿠폰 발급(중복 발급 방지 및 재고 관리)
	@Override
	public void issueCoupon(final CouponIssueRedis couponIssueRedis) {
		final String couponRemainKey = "coupon:remain:" + couponIssueRedis.couponId();
		final String issuedUsersKey = "coupon:issued:" + couponIssueRedis.couponId();
		final String memberId = couponIssueRedis.memberId().toString();

		final Boolean alreadyIssued = redisTemplate.opsForSet().isMember(issuedUsersKey, memberId);
		if (alreadyIssued != null && alreadyIssued) {
			log.info("쿠폰 중복 발급 - memberId: {}, issuedUsersKey: {}", memberId, issuedUsersKey);
			throw new BusinessException(COUPON_ALREADY_ISSUED);
		}

		final Object stockObj = redisTemplate.opsForValue().get(couponRemainKey);
		if(stockObj == null) {
			log.info("재고 없음");
		}
		int stock = stockObj != null ? Integer.parseInt(stockObj.toString()) : 0;
		if (stock <= 0) {
			log.info("쿠폰 재고 부족 - memberId: {}, issuedUsersKey: {}, 남은 수량: {}", memberId, issuedUsersKey, stock);
			throw new BusinessException(COUPON_OUT_OF_STOCK);
		}

		final List<Object> txResults = redisTemplate.execute(new SessionCallback<List<Object>>() {
			@Override
			public List<Object> execute(final RedisOperations operations) throws DataAccessException {
				operations.multi();
				operations.opsForValue().decrement(couponRemainKey);
				operations.opsForSet().add(issuedUsersKey, memberId);
				return operations.exec();
			}
		});

		validateIssueTransaction(txResults, couponRemainKey, issuedUsersKey, memberId);
	}

	private void validateIssueTransaction(final List<Object> txResults, final String remainingKey,
		final String issuedUsersKey, final String memberId) {
		if (txResults == null || txResults.isEmpty() || txResults.size() < 2) {
			log.error("쿠폰 발급 트랜잭션 실패 - memberId: {}, issuedUsersKey: {}, 결과: {}", memberId, issuedUsersKey, txResults);
			rollbackIssueTransaction(remainingKey, issuedUsersKey, memberId);
			throw new BusinessException(REDIS_ISSUE_FAILED);
		}

		final Long remainingQuantity;
		final Long addResult;
		try {
			remainingQuantity = txResults.get(0) != null ? Long.valueOf(txResults.get(0).toString()) : 0L;
			addResult = txResults.get(1) != null ? Long.valueOf(txResults.get(1).toString()) : -1L;
		} catch (final NumberFormatException e) {
			log.error("Redis 트랜잭션 결과 변환 실패 - memberId: {}, issuedUsersKey: {}. 예외: {}", memberId, issuedUsersKey, e.getMessage(), e);
			rollbackIssueTransaction(remainingKey, issuedUsersKey, memberId);
			throw new BusinessException(REDIS_ISSUE_FAILED);
		}

		if (remainingQuantity < 0) {
			log.warn("쿠폰 재고 부족 - memberId: {}, issuedUsersKey: {}, 남은 수량: {}", memberId, issuedUsersKey, remainingQuantity);
			rollbackIssueTransaction(remainingKey, issuedUsersKey, memberId);
			throw new BusinessException(COUPON_OUT_OF_STOCK);
		}

		if (addResult == 0) {
			log.warn("쿠폰 중복 발급 - memberId: {}, issuedUsersKey: {}", memberId, issuedUsersKey);
			rollbackIssueTransaction(remainingKey, issuedUsersKey, memberId);
			throw new BusinessException(COUPON_ALREADY_ISSUED);
		}
	}

	private void rollbackIssueTransaction(final String remainingKey, final String issuedUsersKey, final String memberId) {
		try {
			redisTemplate.opsForValue().increment(remainingKey);
			redisTemplate.opsForSet().remove(issuedUsersKey, memberId);
		} catch (final Exception e) {
			log.error("쿠폰 발급 롤백 중 오류 발생 - memberId: {}, issuedUsersKey: {}. 예외: {}", memberId, issuedUsersKey, e.getMessage(), e);
		}
	}

  // 발급 가능한 쿠폰 목록 조회
	@Override
	public SearchCouponsControllerResponse searchCoupons() {
		final Set<String> keys = redisTemplate.keys("coupon:info:*");
		final List<SearchCouponControllerResponse> couponList = new ArrayList<>();

		if (keys == null || keys.isEmpty()) {
			log.info("조회 가능한 쿠폰 정보가 없습니다.");
			return new SearchCouponsControllerResponse(couponList);
		}

		for (final String infoKey : keys) {
			try {
				final Object valueObj = redisTemplate.opsForValue().get(infoKey);
				final CouponInfoValue info = (CouponInfoValue) valueObj;

				final String remainKey = "coupon:remain:" + info.couponId();
				final Object remainObj = redisTemplate.opsForValue().get(remainKey);
				final int remainingQuantity = remainObj != null ? Integer.parseInt(remainObj.toString()) : 0;

				final SearchCouponControllerResponse couponResponse = toSearchCouponControllerResponse(info, remainingQuantity);
				couponList.add(couponResponse);
			} catch (final Exception e) {
				log.error("쿠폰 정보 키 파싱 실패: {}. 예외: {}", infoKey, e.getMessage(), e);
			}
		}
		return new SearchCouponsControllerResponse(couponList);
	}
}`
        }
      ],
      achievements: [
        {
          metric: "쿠폰 발급 성능",
          before: "285 TPS",
          after: "966 TPS",
          improvement: "3.4배 향상",
          description: "Redis 제고 및 중복 발급 관리 + Kafka를 이용한 DB Write 비동기"
        }
      ],
      lessons: [
        {
          category: "성능 최적화",
          points: [
            "Redis와 Kafka를 조합한 고성능 이벤트 처리",
            "K6를 이용한 API 부하 테스트",
            "정량적인 수치를 통한 성능 개선"
          ]
        },
        {
          category: "Spring Cloud를 활용한 MSA 구축",
          points: [
            "Spring Eureka와 랜덤 포트 사용으로 포트 충돌 없이 Scale-out 가능",
            "Spring Cloud Gateway + Spring Security를 모든 API 요청에 대해 인가 처리를 중앙화",
            "Spring Cloud Config를 이용한 설정 정보 파일 관리를 외부 저장소로 관리, 대칭키 암호화를 사용하여 설정 정보 파일 암호화"
          ]
        }
      ],
      improvements: [
        "Active Profile을 이용한 개발 환경과 배포 환경 분리", 
        "CQRS 패턴 적용을 통한 읽기/쓰기 성능 최적화",
        "MSA 환경에서 데이터 원자성 보장",
        "Event Driven Architecture(EDA), SAGA 패턴, Transactional Outbox 패턴을 함께 이용해서 충분한 데이터 원자성 확보"
      ],
      images: {
        gallery: [
          {
            src: "/images/projects/ceonsun/main.png",
            alt: "메인 페이지",
            title: "메인 화면"
          },
          {
            src: "/images/projects/ceonsun/login.png",
            alt: "로그인 페이지",
            title: "로그인"
          },
          {
            src: "/images/projects/ceonsun/student-description.png",
            alt: "학생 소개글", 
            title: "학생 소개글"
          },
          {
            src: "/images/projects/ceonsun/teacher-description.png",
            alt: "선생 소개글",
            title: "선생 소개글"
          },
          {
            src: "/images/projects/ceonsun/lecture-description.png",
            alt: "강의 소개글",
            title: "강의 소개글"
          },
          {
            src: "/images/projects/ceonsun/class.png", 
            alt: "수강 정보",
            title: "수강 정보"
          },
          {
            src: "/images/projects/ceonsun/notification.png",
            alt: "알림",
            title: "알림"
          },
          {
            src: "/images/projects/ceonsun/coupon-notification.png",
            alt: "쿠폰 알림",
            title: "쿠폰 알림"
          },
          {
            src: "/images/projects/ceonsun/payment.png",
            alt: "결제",
            title: "결제"
          },
          {
            src: "/images/projects/ceonsun/rank.png",
            alt: "강사 랭킹",
            title: "강사 랭킹 시스템"
          }
        ],
        architecture:[
          {
            src: "/images/projects/ceonsun/architecture.png",
            alt: "마이크로서비스 아키텍처",
            title: "시스템 아키텍처"
          },
        ],
        erd: [
          {
            src: "/images/projects/ceonsun/erd.png",
            alt: "데이터베이스 ERD"
          }
        ]
      }
    },
    zipda: {
      title: "ZIPDA(집다)",
      subtitle: "조건 기반 필터링을 지원하는 부동산 매물 검색 플랫폼",
      thumbnail: "/images/projects/zipda/logo.png",
      duration: "2024.11.18 ~ 2024.11.27 (10일)",
      team: "백엔드 1명, 프론트 1명",
      role: "Back-End",
      github: "https://github.com/BrokenFinger98/ZIPDA",
      demo: "#",
      demoVideo: "https://www.youtube.com/watch?v=gwj6t58paY0",
      overview: {
        background: "SSAFY에서 재공해준 부동산 데이터를 활용하여 진행한 프로젝트입니다. 기존 부동산 플랫폼에서 차별화를 준 서비스를 만들고 싶었습니다. AI 기술을 활용한 챗봇과 정교한 필터링 시스템을 통해 더 나은 부동산 검색 경험을 제공하고자 했습니다.",
        keyFeatures: [
          {
            title: "🏠 부동산 매물 검색",
            description: [
              "위치 및 조건 기반 아파트 검색",
              "카카오맵 연동으로 매물 위치 확인",
              "상세 매물 정보 및 거래 내역 제공"
            ]
          },
          {
            title: "👤 사용자 관리",
            description: [
              "소셜 로그인 (Google, Kakao, Naver)",
              "JWT 기반 인증 시스템",
              "사용자 프로필 관리"
            ]
          },
          {
            title: "💬 커뮤니티 기능",
            description: [
              "부동산 관련 게시글 및 댓글",
              "실시간 메시징 시스템",
              "관리자 공지사항 관리"
            ]
          },
          {
            title: "🤖 AI 챗봇",
            description: [
              "OpenAI ChatGPT API 연동",
              "자연어 부동산 상담 서비스",
              "맞춤형 투자 조언 제공"
            ]
          },
          {
            title: "❤️ 관심 매물",
            description: [
              "관심 지역 및 아파트 저장",
              "개인화된 매물 추천",
              "찜 목록 관리 기능"
            ]
          }
        ]
      },
      challenges: [
        {
          problem: "복잡한 검색 조건으로 인한 메서드 폭증과 유지보수성 저하",
          situation: "지역, 가격대, 매물타입 등 다양한 검색 조건 조합으로 인해 너무 많은 경우의 수가 발생. 각 경우마다 별도의 메서드를 만들어야 하는 문제로 코드 중복과 유지보수성 저하",
          solution: "QueryDSL을 활용한 동적 쿼리 생성 메서드로 통합 처리",
          implementation: [
            "BooleanExpression을 활용한 null-safe 조건부 쿼리 구성",
            "하나의 동적 쿼리 생성 메서드로 모든 검색 조건 처리",
            "조건별 메서드 분리로 코드 재사용성과 가독성 향상",
            "타입 안전한 쿼리 작성으로 런타임 오류 방지"
          ],
          result: "검색 관련 메서드 수 80% 감소, 유지보수 효율성 및 개발 속도 대폭 향상"
        },
        {
          problem: "이메일 전송 동기 처리로 인한 응답 지연 문제",
          situation: "회원가입 및 인증 과정에서 이메일 전송을 동기로 처리하여 사용자가 응답을 받기까지 10초 이상 소요되는 성능 문제 발생",
          solution: "Spring의 @Async 어노테이션을 활용한 비동기 이메일 전송 구현",
          implementation: [
            "@Async 어노테이션으로 이메일 전송 로직 비동기 처리",
            "ThreadPoolTaskExecutor 설정으로 스레드 풀 관리",
            "이메일 전송 실패 시 예외 처리 및 재시도 로직 구현",
            "사용자 응답과 이메일 전송 프로세스 분리"
          ],
          result: "사용자 응답 시간 70% 단축 (10.x초 → 3.x초), 사용자 경험 대폭 개선"
        },
        {
          problem: "Spring AI 기반 부동산 상담 챗봇의 컨텍스트 관리",
          situation: "ChatGPT API 연동 시 프롬프트 템플릿 관리와 사용자별 대화 컨텍스트 유지가 필요한 상황",
          solution: "PromptTemplateLoader와 동적 프롬프트 관리 시스템 구축",
          implementation: [
            "프롬프트 유형별 템플릿 로딩 시스템 구현",
            "시스템 메시지와 사용자 입력을 조합한 컨텍스트 구성",
            "자유 대화와 구조화된 상담 모드 분리",
            "AI 응답 품질 개선을 위한 프롬프트 엔지니어링"
          ],
          result: "부동산 전문 상담 정확도 향상, 사용자 만족도 향상"
        }
      ],
      codeExamples: [
        {
          title: "QueryDSL 조건부 표현식과 동적 쿼리",
          language: "java",
          code: `@Repository
@RequiredArgsConstructor
public class HouseQueryRepository {
    
    private final JPAQueryFactory queryFactory;
    
    // Null-safe 조건부 표현식
    private BooleanExpression sidoEq(String sido) {
        return hasText(sido) ? house.region.sidoName.eq(sido) : null;
    }
    
    private BooleanExpression gugunEq(String gugun) {
        return hasText(gugun) ? house.region.gugunName.eq(gugun) : null;
    }
    
    private BooleanExpression houseTypeEq(String houseType) {
        return hasText(houseType) ? house.houseType.eq(houseType) : null;
    }
    
    // 사용자 인증 상태별 관심매물 포함 동적 쿼리
    public List<HouseAllQueryResponse> findAllWithLikeStatus(
            final Long memberId,
            final HouseSearchCondition condition,
            final Pageable pageable) {
        
        return queryFactory
                .select(Projections.constructor(HouseAllQueryResponse.class,
                        house.id,
                        house.houseName,
                        house.houseType,
                        house.region.sidoName,
                        house.region.gugunName,
                        house.region.dongName,
                        house.roadName,
                        house.roadNameBonbun,
                        house.roadNameBubun,
                        house.latitude,
                        house.longitude,
                        // 인증된 사용자일 경우 관심매물 여부 포함
                        memberId != null ? 
                            likeHouse.id.isNotNull().as("isLiked") : 
                            Expressions.FALSE.as("isLiked")
                ))
                .from(house)
                .leftJoin(house.region, region)
                // 동적 조인: 로그인 상태일 때만 관심매물 테이블 조인
                .leftJoin(memberId != null ? likeHouse : null)
                .on(memberId != null ? 
                    likeHouse.house.eq(house).and(likeHouse.member.id.eq(memberId)) : 
                    null)
                .where(
                    sidoEq(condition.getSido()),
                    gugunEq(condition.getGugun()),
                    houseTypeEq(condition.getHouseType()),
                    houseNameContains(condition.getHouseName())
                )
                .orderBy(house.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
    }
}`
        },
        {
          title: "비동기 Mail 전송",
          language: "java",
          code: `@RequiredArgsConstructor
@Service
public class MailService {

    private static final String VERIFICATION_CODE_SUBJECT = "SSAFY-HOME: 인증 코드 유효기간은 3분 입니다.";
    private static final String TEMPORARY_PASSWORD_SUBJECT = "SSAFY-HOME: 임시 비밀번호 입니다.";

    private final MailSendClient mailSendClient;

    @Async
    public void sendVerificationCode(final String to, final String code) {
        mailSendClient.sendMail(to, VERIFICATION_CODE_SUBJECT, code);
    }

    @Async
    public void sendTemporaryPassword(final String to, final String temporaryPassword) {
        mailSendClient.sendMail(to, TEMPORARY_PASSWORD_SUBJECT, temporaryPassword);
    }
}

// Async Configuration
@EnableAsync
@Configuration
public class AsyncConfig implements AsyncConfigurer {

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(10);
        taskExecutor.setMaxPoolSize(20);
        taskExecutor.setQueueCapacity(40);
        taskExecutor.setTaskDecorator(new MdcTaskDecorator());
        taskExecutor.setThreadNamePrefix("Async-");
        return taskExecutor;
    }

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return new AsyncExceptionHandler();
    }
}`
        },
        {
          title: "Spring AI를 활용한 챗봇 기능",
          language: "java",
          code: `@RequiredArgsConstructor
@RequestMapping("/chat")
@RestController
public class AiController {

    private final OpenAiChatModel chatModel;
    private final PromptTemplateLoader promptLoader;

    @PostMapping
    @UserAccess
    public ResponseEntity<PromptResponse> chat(
            @AuthenticationPrincipal AccessContext accessContext,
            @Valid@RequestBody final ChatRequest chatRequest) {
        return ResponseEntity.ok().body(PromptResponse.from(getResponse(DEFAULT, chatRequest.message())));
    }

    @PostMapping("/prompts")
    @UserAccess
    public ResponseEntity<PromptResponse> prompt(
            @AuthenticationPrincipal AccessContext accessContext,
            @RequestBody final PromptRequest promptRequest) {
        return ResponseEntity.ok().body(PromptResponse.from(getResponse(promptRequest.promptType(), null)));
    }

    private String getResponse(final PromptType promptType, final String message) {
        SystemMessage systemMessage = new SystemMessage(promptLoader.getSystemPromptResource(promptType));
        if(message == null){
            return chatModel.call(systemMessage);
        }
        UserMessage userMessage = new UserMessage(message);
        return chatModel.call(systemMessage, userMessage);
    }
}

// 프롬프트 템플릿 관리
@Component
@Slf4j
public class ChoicePromptTemplateLoader {

    @Value("classpath:prompts/prompt-choice-system.st")
    private Resource systemPromptResource;

    @Value("classpath:prompts/prompt-choice-user.st")
    private Resource userPromptResource;

    public String loadSystemPrompt() {
        try {
            return new String(FileCopyUtils.copyToByteArray(systemPromptResource.getInputStream()), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Error loading system prompt template", e);
            throw new RuntimeException("Failed to load system prompt template", e);
        }
    }

    public String loadUserPrompt() {
        try {
            return new String(FileCopyUtils.copyToByteArray(userPromptResource.getInputStream()), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Error loading user prompt template", e);
            throw new RuntimeException("Failed to load user prompt template", e);
        }
    }
}

@Component
@Slf4j
public class PromptTemplateLoader {

    @Value("classpath:prompts/system-trend.st")
    private Resource trendSystemPromptResource;

    @Value("classpath:prompts/system-information.st")
    private Resource informationSystemPromptResource;

    @Value("classpath:prompts/system-news.st")
    private Resource newsSystemPromptResource;

    @Value("classpath:prompts/system-standard.st")
    private Resource standardSystemPromptResource;

    @Value("classpath:prompts/system-advice.st")
    private Resource adviceSystemPromptResource;

    @Value("classpath:prompts/system-default.st")
    private Resource defaultSystemPromptResource;

    private Map<PromptType, Resource> systemPromptResources;


    @PostConstruct
    public void initPromptResources() {
        systemPromptResources = new EnumMap<>(PromptType.class);
        systemPromptResources.put(TREND, trendSystemPromptResource);
        systemPromptResources.put(INFORMATION, informationSystemPromptResource);
        systemPromptResources.put(NEWS, newsSystemPromptResource);
        systemPromptResources.put(STANDARD, standardSystemPromptResource);
        systemPromptResources.put(ADVICE, adviceSystemPromptResource);
        systemPromptResources.put(DEFAULT, defaultSystemPromptResource);
    }

    public String getSystemPromptResource(PromptType promptType) {
        try {
            return new String(FileCopyUtils.copyToByteArray(systemPromptResources.get(promptType).getInputStream()), StandardCharsets.UTF_8);
        } catch (IOException e){
            throw new RuntimeException("Failed to load system prompt template", e);
        }
    }
}`
        }
      ],
      techStack: {
        "Back-end": [
          { name: "Java", version: "21", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Spring Boot", version: "3.3.5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "Spring Data JPA", version: "", icon: "https://spring.io/img/projects/spring-data.svg" },
          { name: "QueryDSL", version: "", icon: "https://cdn.inflearn.com/public/files/courses/328989/c1b5cabc-03f0-4cd8-9f98-8ec0e2f42378/329248-4.png" },
          { name: "Swagger", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" }
        ],
        "Front-end": [
          { name: "Vue.js", version: "3.5.12", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
          { name: "HTML5", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS3", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
        ],
        "Database / Cache": [
          { name: "MySQL", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
          { name: "Redis", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
        ],
        "Infra": [
          { name: "Docker", version: "", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          { name: "AWS EC2", version: "", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }
        ]
      },
      achievements: [
        {
          metric: "유지보수 향상 및 개발 속도 향상",
          before: "5~6개 method",
          after: "1개 method",
          improvement: "80% 단축",
          description: "QueryDSL을 이용한 동적 쿼리 작성"
        },
        {
          metric: "응답 시간 향상",
          before: "10.x 초",
          after: "3.x 초",
          improvement: "70% 단축",
          description: "JavaMailSend에 Async 적용으로 응답 속도 향상"
        }
      ],
      lessons: [
        {
          category: "JPA와 QueryDsl",
          points: [
            "JPA를 활용한 Database와 Entity Mapping",
            "QueryDSL BooleanExpression을 통한 null-safe 조건부 쿼리 설계",
            "N+1 문제 해결을 위한 페치 조인과 projection 활용",
            "대용량 데이터 처리를 위한 커서 기반 페이지네이션 도입"
          ]
        },
        {
          category: "Spring AI",
          points: [
            "Prompt 파일을 활용한 System Prompt를 통해 응답 정확도 향상",
            "Spring AI framework로 ChatGPT API 효율적 연동"
          ]
        },
      ],
      images: {
        erd: [
          {
            src: "/images/projects/zipda/erd.png",
            alt: "데이터베이스 ERD"
          }
        ]
      }
    }
  };

  const project = projectsData[projectId as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            프로젝트를 찾을 수 없습니다
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "overview", name: "프로젝트 개요", icon: <Target className="w-4 h-4" /> },
    { id: "tech", name: "사용 기술", icon: <Settings className="w-4 h-4" /> },
    { id: "architecture", name: "아키텍처 & 설계", icon: <Server className="w-4 h-4" /> },
    { id: "challenges", name: "기술적 도전과 해결", icon: <Zap className="w-4 h-4" /> },
    { id: "code", name: "핵심 구현 코드", icon: <Code className="w-4 h-4" /> },
    { id: "achievements", name: "성과 및 배운 점", icon: <TrendingUp className="w-4 h-4" /> }
  ].filter(section => {
    // 프로젝트별로 섹션 필터링
    if (section.id === "architecture" && !(
      ('architecture' in project && project.architecture) || 
      ('images' in project && project.images && ('architecture' in project.images || 'erd' in project.images))
    )) {
      return false;
    }
    if (section.id === "challenges" && !('challenges' in project && project.challenges)) {
      return false;
    }
    if (section.id === "code" && !('codeExamples' in project && project.codeExamples)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>홈으로 돌아가기</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              {project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>라이브 데모</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  {project.thumbnail.startsWith('/') ? (
                    <img 
                      src={project.thumbnail} 
                      alt={`${project.title} 로고`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-4xl">{project.thumbnail}</div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{project.team}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">역할: {project.role}</span>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {activeSection === "overview" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    📊 프로젝트 개요
                  </h2>
                  
                  <div className="space-y-8">
                    {/* 배경 및 동기 */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        배경 및 동기
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.overview.background}
                      </p>
                    </div>

                    {renderKeyFeatures(project.overview)}

                    {renderVideoPortfolio(project)}

                    {renderDemoVideo(project)}

                    {/* README 문서 */}
                    {'readme' in project.overview && project.overview.readme && (
                      <div className="github-markdown bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700"
                        style={{
                          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
                          fontSize: '16px',
                          lineHeight: '1.5',
                          wordWrap: 'break-word'
                        }}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          components={{
                            code({className, children, ...props}: {className?: string, children?: React.ReactNode} & React.HTMLProps<HTMLElement>) {
                              const match = /language-(\w+)/.exec(className || '')
                              const isInline = !match
                              
                              // React 노드를 문자열로 변환하는 함수
                              const getTextContent = (node: React.ReactNode): string => {
                                if (typeof node === 'string') return node;
                                if (typeof node === 'number') return String(node);
                                if (Array.isArray(node)) return node.map(getTextContent).join('');
                                if (node && typeof node === 'object' && 'props' in node && node.props && typeof node.props === 'object' && 'children' in node.props) {
                                  return getTextContent((node.props as { children: React.ReactNode }).children);
                                }
                                return '';
                              };
                              
                              const textContent = getTextContent(children);
                              
                              if (isInline) {
                                return (
                                  <code 
                                    className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
                                    style={{
                                      fontSize: '85%',
                                      fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
                                    }}
                                    {...props}
                                  >
                                    {textContent}
                                  </code>
                                )
                              }
                              
                              return (
                                <div className="my-4">
                                  <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 overflow-x-auto">
                                    <code 
                                      className={`text-gray-900 dark:text-gray-100 font-mono text-sm ${className || ''}`}
                                      style={{
                                        fontFamily: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
                                      }}
                                    >
                                      {textContent.replace(/\n$/, '')}
                                    </code>
                                  </pre>
                                </div>
                              )
                            },
                            h1: ({children}) => (
                              <h1 
                                className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 mt-8 pb-3 border-b border-gray-300 dark:border-gray-600"
                                style={{ fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}
                              >
                                {children}
                              </h1>
                            ),
                            h2: ({children}) => (
                              <h2 
                                className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 pb-2 border-b border-gray-300 dark:border-gray-600"
                                style={{ fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}
                              >
                                {children}
                              </h2>
                            ),
                            h3: ({children}) => (
                              <h3 
                                className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6"
                                style={{ fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}
                              >
                                {children}
                              </h3>
                            ),
                            h4: ({children}) => (
                              <h4 
                                className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-5"
                                style={{ fontWeight: '600', marginTop: '24px', marginBottom: '16px' }}
                              >
                                {children}
                              </h4>
                            ),
                            p: ({children}) => (
                              <p className="text-gray-900 dark:text-gray-100 mb-4" style={{ marginBottom: '16px' }}>
                                {children}
                              </p>
                            ),
                            ul: ({children}) => (
                              <ul className="text-gray-900 dark:text-gray-100 mb-4 ml-6" style={{ marginBottom: '16px', paddingLeft: '2em' }}>
                                {children}
                              </ul>
                            ),
                            ol: ({children}) => (
                              <ol className="text-gray-900 dark:text-gray-100 mb-4 ml-6" style={{ marginBottom: '16px', paddingLeft: '2em' }}>
                                {children}
                              </ol>
                            ),
                            li: ({children}) => (
                              <li className="mb-1" style={{ marginBottom: '0.25em' }}>
                                {children}
                              </li>
                            ),
                            strong: ({children}) => (
                              <strong className="font-semibold text-gray-900 dark:text-white">
                                {children}
                              </strong>
                            ),
                            blockquote: ({children}) => (
                              <blockquote 
                                className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 text-gray-600 dark:text-gray-400 italic"
                                style={{ marginTop: '0', marginBottom: '16px' }}
                              >
                                {children}
                              </blockquote>
                            ),
                            hr: () => (
                              <hr className="border-0 border-t border-gray-300 dark:border-gray-600 my-6" style={{ margin: '24px 0' }} />
                            ),
                            a: ({href, children}) => (
                              <a 
                                href={href} 
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                              </a>
                            ),
                            table: ({children}) => (
                              <div className="overflow-x-auto my-4">
                                <table className="border-collapse border border-gray-300 dark:border-gray-600 w-full">
                                  {children}
                                </table>
                              </div>
                            ),
                            thead: ({children}) => (
                              <thead className="bg-gray-50 dark:bg-gray-700">
                                {children}
                              </thead>
                            ),
                            th: ({children}) => (
                              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-white">
                                {children}
                              </th>
                            ),
                            td: ({children}) => (
                              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100">
                                {children}
                              </td>
                            )
                          }}
                        >
                          {project.overview.readme}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* 화면 이미지 */}
                    {'images' in project && project.images && 'gallery' in project.images && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                          📸 화면 이미지
                        </h3>
                        <div className="space-y-6">
                          {(project.images.gallery as ImageItem[]).map((image: ImageItem, index: number) => (
                            <div key={index} className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 ${image.size === 'small' ? 'max-w-md mx-auto' : ''}`}>
                              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                <p className="text-base text-gray-700 dark:text-gray-200 font-medium text-left">
                                  {image.title}
                                </p>
                              </div>
                              <div className="w-full">
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className={`w-full h-auto object-contain ${image.size === 'small' ? 'max-w-sm mx-auto' : ''}`}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "architecture" && (
                ('architecture' in project && project.architecture) || 
                ('images' in project && project.images && ('architecture' in project.images || 'erd' in project.images))
              ) && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🏗️ 아키텍처 & 설계
                  </h2>
                  
                  <div className="space-y-8">
                    

                    {/* Architecture 섹션 */}
                    {('images' in project && project.images && 'architecture' in project.images) && (
                      <div className="space-y-6">
                        
                        {/* Architecture 이미지 */}
                        {'images' in project && project.images && 'architecture' in project.images && (
                          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                아키텍처
                              </h4>
                            </div>
                            <div>
                              {(project.images.architecture as ImageItem[]).map((image: ImageItem, index: number) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                                  <div className="w-full p-2">
                                    <img
                                      src={image.src}
                                      alt={image.alt}
                                      className="w-full h-auto object-contain rounded"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                    {/* Architecture 컴포넌트: 요청에 따라 제거됨 */}
                      </div>
                    )}

                    {/* Components 섹션 (아키텍처 이미지 다음) */}
                    {'components' in project && project.components && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-4 bg-gray-50 dark:bg-gray-900">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            🔧 주요 컴포넌트
                          </h4>
                        </div>
                        <div className="p-6">
                          <div className="space-y-8">
                            {Object.entries(project.components).map(([serviceName, serviceInfo], index) => (
                              <div key={index} className="border-l-4 border-blue-500 pl-6">
                                <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                  {serviceName}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                  {serviceInfo.description}
                                </p>

                                {serviceInfo.responsibilities && (
                                  <div className="mb-4">
                                    <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                      주요 책임
                                    </h6>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {serviceInfo.responsibilities.map((responsibility, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                                          {responsibility}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {serviceInfo.keyComponents && (
                                  <div className="mb-4">
                                    <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                      핵심 컴포넌트
                                    </h6>
                                    <div className="grid gap-4 md:grid-cols-2">
                                      {serviceInfo.keyComponents.map((component, idx) => (
                                        <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                          <h6 className="font-semibold text-gray-900 dark:text-white text-sm">
                                            {component.name}
                                          </h6>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 mb-2">
                                            {component.description}
                                          </p>
                                          {component.methods && (
                                            <div className="text-xs">
                                              <span className="text-gray-500 dark:text-gray-400">주요 메서드:</span>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                {component.methods.map((method, methodIdx) => (
                                                  <span key={methodIdx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-mono">
                                                    {method}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(serviceInfo as any).entities && (
                                  <div className="mb-4">
                                    <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                      주요 엔티티
                                    </h6>
                                    <div className="flex flex-wrap gap-2">
                                      {(serviceInfo as any).entities.map((entity: string, idx: number) => (
                                        <span key={idx} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs">
                                          {entity}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(serviceInfo as any).integrations && (
                                  <div className="mb-4">
                                    <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                      연동 서비스
                                    </h6>
                                    <div className="flex flex-wrap gap-2">
                                      {(serviceInfo as any).integrations.map((integration: string, idx: number) => (
                                        <span key={idx} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs">
                                          {integration}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(serviceInfo as any).features && (
                                  <div className="mb-4">
                                    <h6 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                      특별 기능
                                    </h6>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {(serviceInfo as any).features.map((feature: string, idx: number) => (
                                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ERD 섹션 */}
                    {('images' in project && project.images && 'erd' in project.images) && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          🗄️ ERD & Database
                        </h3>
                        
                        {/* ERD 이미지 */}
                        {'images' in project && project.images && 'erd' in project.images && (
                          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ERD (Entity Relationship Diagram)
                              </h4>
                            </div>
                            <div className="space-y-6 p-4">
                              {(project.images.erd as ImageItem[]).map((image: ImageItem, index: number) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                                  {image.title && (
                                    <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                      <p className="text-base text-gray-700 dark:text-gray-200 font-medium text-left">
                                        {image.title}
                                      </p>
                                    </div>
                                  )}
                                  <div className="w-full">
                                    <img
                                      src={image.src}
                                      alt={image.alt}
                                      className="w-full h-auto object-contain rounded"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "challenges" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    ⚡ 기술적 도전과 해결
                  </h2>
                  
                  <div className="space-y-8">
                    {'challenges' in project && project.challenges.map((challenge, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {challenge.problem}
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                              <span className="font-medium text-red-900 dark:text-red-100">문제 상황</span>
                            </div>
                            <p className="text-red-700 dark:text-red-200">
                              {challenge.situation}
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <span className="font-medium text-blue-900 dark:text-blue-100">해결 방안</span>
                            </div>
                            <p className="text-blue-700 dark:text-blue-200 mb-3">
                              {challenge.solution}
                            </p>
                            <ul className="space-y-1">
                              {challenge.implementation.map((impl, implIndex) => (
                                <li key={implIndex} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-blue-700 dark:text-blue-200 text-sm">{impl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-green-900 dark:text-green-100">성과</span>
                            </div>
                            <p className="text-green-700 dark:text-green-200 font-medium">
                              {challenge.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "tech" && 'techStack' in project && project.techStack && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    🔧 사용 기술
                  </h2>
                  
                  <div className="space-y-6">
                    {Object.entries(project.techStack).map(([category, techs]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                          {category}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                          {techs.map((tech: TechItem, index: number) => (
                            <div key={index} className="text-center p-4">
                              <img 
                                src={tech.icon}
                                alt={tech.name}
                                className="w-16 h-16 mx-auto mb-3"
                              />
                              <div className="font-semibold text-gray-900 dark:text-white text-base">
                                {tech.name}
                              </div>
                              {tech.version && (
                                <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                  v{tech.version}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "code" && 'codeExamples' in project && project.codeExamples && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    💻 핵심 구현 코드
                  </h2>
                  
                  <div className="space-y-8">
                    {project.codeExamples.map((example, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          {example.title}
                        </h3>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language={example.language}
                            style={oneDark}
                            customStyle={{
                              margin: 0,
                              padding: '1.5rem',
                              fontSize: '0.875rem',
                              lineHeight: '1.5',
                            }}
                            showLineNumbers={true}
                            wrapLines={true}
                            wrapLongLines={true}
                          >
                            {example.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeSection === "achievements" && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    📈 성과 및 배운 점
                  </h2>
                  
                  <div className="space-y-8">
                    {'achievements' in project && project.achievements && project.achievements.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          정량적 성과
                        </h3>
                        <div className="grid gap-4">
                          {project.achievements.map((achievement, index) => (
                            <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {achievement.metric}
                                </h4>
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                                  {achievement.improvement}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 mb-2">
                                <span className="text-gray-500 dark:text-gray-400">
                                  Before: {achievement.before}
                                </span>
                                <span className="text-blue-600 dark:text-blue-400">→</span>
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                  After: {achievement.after}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {achievement.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {'lessons' in project && project.lessons && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          배운 점과 성장
                        </h3>
                        <div className="space-y-6">
                          {project.lessons.map((lesson, index) => (
                            <div key={index}>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                {lesson.category}
                              </h4>
                              <ul className="space-y-2">
                                {lesson.points.map((point, pointIndex) => (
                                  <li key={pointIndex} className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {'improvements' in project && project.improvements && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          향후 개선 방향
                        </h3>
                        <ul className="space-y-2">
                          {project.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
