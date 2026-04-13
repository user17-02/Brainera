import React from 'react';
import styles from './InstructorDashboard.module.css'; // Reusing dashboard styles
import { BookOpen, Users, MessageSquare, DollarSign, Activity } from 'lucide-react'; // Import icons

const InstructorDashboardOverview = () => {
  return (
    <div className={styles.mainContent}>
      <h2 className={styles.welcomeMessage}>Welcome to your Instructor Dashboard!</h2>
      <p className={styles.subMessage}>Here you can manage your courses, view enrolled students, and track your progress.</p>
      
      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <BookOpen size={30} />
          <h3>Total Courses</h3>
          <p>5</p> {/* Replace with dynamic data */}
        </div>
        <div className={styles.dashboardCard}>
          <Users size={30} />
          <h3>Total Students</h3>
          <p>120</p> {/* Replace with dynamic data */}
        </div>
        <div className={styles.dashboardCard}>
          <MessageSquare size={30} />
          <h3>New Reviews</h3>
          <p>7</p> {/* Replace with dynamic data */}
        </div>
        <div className={styles.dashboardCard}>
          <DollarSign size={30} />
          <h3>Course Sales</h3>
          <p>$1500.00</p> {/* Replace with dynamic data */}
        </div>
        <div className={styles.dashboardCard}>
          <Activity size={30} />
          <h3>Active Courses</h3>
          <p>3</p> {/* Replace with dynamic data */}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardOverview;
