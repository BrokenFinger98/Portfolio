import { Metadata } from 'next';
import ProjectDetailPage from '@/components/ProjectDetailPage';

interface RouteParams {
  params: {
    id: string;
  };
}

export function generateMetadata({ params }: RouteParams): Metadata {
  const { id } = params;
  return {
    title: `프로젝트 상세 - ${id} | 백엔드 개발자 유선우`,
    description: '백엔드 개발자 유선우의 프로젝트 상세 정보와 기술적 구현 내용',
  };
}

export default function ProjectPage({ params }: RouteParams) {
  const { id } = params;
  return <ProjectDetailPage projectId={id} />;
}
