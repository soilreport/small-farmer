import Card from '../../components/Card';
import AnimatedCard from '../../components/AnimatedCard';

export default function Analytics() {
  return (
    <div className="grid gap-4 grid-cols-2">
      <Card title="Regular Card">Static content here</Card>
      <AnimatedCard>Animated content!</AnimatedCard>
    </div>
  );
}