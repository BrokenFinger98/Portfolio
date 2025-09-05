import { Star } from "lucide-react";

export default function SkillsSection() {
  const renderStars = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= level
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const coreSkills = [
    {
      category: "Language",
      skills: [
        { name: "Java", level: 5, color: "bg-gradient-to-r from-amber-400 to-orange-400" },
        { name: "Kotlin", level: 5, color: "bg-gradient-to-r from-purple-400 to-violet-500" },
        { name: "JavaScript", level: 3, color: "bg-gradient-to-r from-yellow-300 to-amber-400" },
        { name: "C", level: 2, color: "bg-gradient-to-r from-slate-400 to-gray-500" },
      ]
    },
    {
      category: "Back-end",
      skills: [
        { name: "Spring Boot", level: 5, color: "bg-gradient-to-r from-emerald-400 to-green-500" },
        { name: "Spring Data JPA", level: 5, color: "bg-gradient-to-r from-green-400 to-emerald-600" },
        { name: "QueryDSL", level: 5, color: "bg-gradient-to-r from-indigo-400 to-blue-500" },
        { name: "Spring Security", level: 4, color: "bg-gradient-to-r from-lime-400 to-green-400" },
        { name: "Spring Cloud", level: 4, color: "bg-gradient-to-r from-teal-300 to-cyan-400" },
        { name: "Apache Kafka", level: 4, color: "bg-gradient-to-r from-gray-500 to-slate-600" },
      ]
    },
    {
      category: "Database & Cache",
      skills: [
        { name: "MySQL", level: 5, color: "bg-gradient-to-r from-sky-400 to-blue-500" },
        { name: "Redis", level: 5, color: "bg-gradient-to-r from-rose-400 to-red-500" },
        { name: "MongoDB", level: 3, color: "bg-gradient-to-r from-green-500 to-emerald-600" },
      ]
    },
    {
      category: "Infrastructure",
      skills: [
        { name: "Docker", level: 5, color: "bg-gradient-to-r from-cyan-400 to-blue-500" },
        { name: "AWS", level: 4, color: "bg-gradient-to-r from-orange-400 to-amber-500" },
        { name: "Jenkins", level: 4, color: "bg-gradient-to-r from-blue-400 to-indigo-500" },
      ]
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git", level: 5,  color: "bg-gradient-to-r from-slate-600 to-gray-700" },
        { name: "JUnit5", level: 5, color: "bg-gradient-to-r from-orange-300 to-yellow-400" },
        { name: "Jira", level: 4, color: "bg-gradient-to-r from-blue-500 to-indigo-600" },
      ]
    }
  ];

  const experienceLegend = [
    { level: 5, description: "숙련 활용 - 복잡한 기능 구현, 문제 해결 가능", icon: "⭐⭐⭐⭐⭐" },
    { level: 4, description: "실무 활용 - 프로젝트 적용, 독립적 개발", icon: "⭐⭐⭐⭐" },
    { level: 3, description: "기본 활용 - 기본 기능 구현, 학습 경험", icon: "⭐⭐⭐" },
    { level: 2, description: "초보 활용 - 간단한 기능, 튜토리얼 경험", icon: "⭐⭐" },
    { level: 1, description: "입문 수준 - 기본 개념 이해, 학습 중", icon: "⭐" },
  ];


  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            기술 역량
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            백엔드 개발에 필요한 핵심 기술들과 숙련도를 확인해보세요.
          </p>
          
          {/* 경험도 범례 */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 inline-block">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">숙련도 기준</h3>
            <div className="space-y-2 text-left">
              {experienceLegend.map((legend, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-sm">{legend.icon}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{legend.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 핵심 기술 스택 */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {coreSkills.slice(0, 4).map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      {renderStars(skill.level)}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${(skill.level / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
          
          {/* 마지막 카드는 가운데 배치 */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3">
                  {coreSkills[4].category}
                </h3>
                <div className="space-y-5">
                  {coreSkills[4].skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                        {renderStars(skill.level)}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}