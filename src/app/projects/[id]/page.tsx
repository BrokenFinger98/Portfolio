import { Metadata } from 'next';
import ProjectDetailPage from '@/components/ProjectDetailPage';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `프로젝트 상세 - ${id} | 백엔드 개발자 유선우`,
    description: '백엔드 개발자 유선우의 프로젝트 상세 정보와 기술적 구현 내용',
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectDetailPage projectId={id} />;
}