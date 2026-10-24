import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          onPress={() => navigate('/')}
          style={styles.homeLink}
          activeOpacity={0.7}
        >
          <Home size={14} color="#94A3B8" />
          <Text style={styles.homeText}>Home</Text>
        </TouchableOpacity>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <View key={idx} style={styles.itemWrapper}>
              <ChevronRight size={14} color="#475569" />
              {isLast || !item.path ? (
                <Text style={styles.currentText}>
                  {item.label}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() => item.path && navigate(item.path)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.linkText}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(7, 11, 20, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inner: {
    maxWidth: 1280,
    width: '100%',
    marginHorizontal: 'auto' as any,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  homeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  homeText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  currentText: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '600',
  },
});
