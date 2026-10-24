import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Cpu, PhoneCall, Zap } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const MobileActionBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCall = () => {
    Linking.openURL(`tel:${siteConfig.phoneRaw}`);
  };

  const isHome = location.pathname === '/';
  const isServices = location.pathname.startsWith('/services');
  const isBook = location.pathname === '/contact';

  const ContainerView = View as any;

  return (
    <div className="md:hidden">
      <ContainerView style={styles.outerWrapper} className="bottom-bar-wrapper mobile-only-bar">
        <View style={styles.dockBar}>
          {/* 1. Home Tab */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('/')}
            style={styles.navTab}
          >
            <View style={[styles.iconCircle, isHome && styles.activeIconCircle]}>
              <LayoutGrid size={18} color={isHome ? '#16A34A' : '#475569'} />
            </View>
            <Text style={[styles.navText, isHome && styles.activeNavText]}>
              Home
            </Text>
          </TouchableOpacity>

          {/* 2. Services Tab */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('/services')}
            style={styles.navTab}
          >
            <View style={[styles.iconCircle, isServices && styles.activeIconCircle]}>
              <Cpu size={18} color={isServices ? '#16A34A' : '#475569'} />
            </View>
            <Text style={[styles.navText, isServices && styles.activeNavText]}>
              Services
            </Text>
          </TouchableOpacity>

          {/* 3. Call Tab (Deep Navy) */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCall}
            style={styles.navTab}
          >
            <View style={[styles.iconCircle, styles.callIconCircle]}>
              <PhoneCall size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.navText, styles.callNavText]}>
              Call
            </Text>
          </TouchableOpacity>

          {/* 4. Book Tab (Tech Green) */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('/contact')}
            style={styles.navTab}
          >
            <View style={[styles.iconCircle, styles.bookIconCircle, isBook && styles.activeBookIconCircle]}>
              <Zap size={18} color={isBook ? '#FFFFFF' : '#16A34A'} fill={isBook ? '#FFFFFF' : 'none'} />
            </View>
            <Text style={[styles.navText, isBook && styles.activeNavText]}>
              Book
            </Text>
          </TouchableOpacity>
        </View>
      </ContainerView>
    </div>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    position: 'fixed' as any,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'box-none' as any,
  },
  dockBar: {
    width: '100%',
    maxWidth: 460,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: '#06223A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    ...({
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 8px 30px 0 rgba(6, 34, 58, 0.12), 0 0 1px 1px rgba(226, 232, 240, 0.8)',
    } as any),
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeIconCircle: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: '#22C55E',
    ...({
      boxShadow: '0 0 10px rgba(34, 197, 94, 0.25)',
    } as any),
  },
  callIconCircle: {
    backgroundColor: '#06223A',
    borderColor: '#06223A',
    ...({
      boxShadow: '0 3px 10px rgba(6, 34, 58, 0.3)',
    } as any),
  },
  bookIconCircle: {
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: '#22C55E',
  },
  activeBookIconCircle: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
    marginTop: 3,
  },
  activeNavText: {
    color: '#000000',
    fontWeight: '800',
  },
  callNavText: {
    color: '#06223A',
    fontWeight: '700',
  },
});
