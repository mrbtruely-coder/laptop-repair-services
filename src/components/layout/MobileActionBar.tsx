import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Cpu, PhoneCall, MessageCircle, Zap } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const MobileActionBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCall = () => {
    Linking.openURL(`tel:${siteConfig.phoneRaw}`);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent('Hello Door Step Service, I want to book a repair service.')}`;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
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
            <LayoutGrid size={18} color={isHome ? '#E2B98E' : '#D2DCD2'} />
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
            <Cpu size={18} color={isServices ? '#E2B98E' : '#D2DCD2'} />
          </View>
          <Text style={[styles.navText, isServices && styles.activeNavText]}>
            Services
          </Text>
        </TouchableOpacity>

        {/* 3. Call Tab (Warm Terracotta Clay) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCall}
          style={styles.navTab}
        >
          <View style={[styles.iconCircle, styles.callIconCircle]}>
            <PhoneCall size={18} color="#FAF6F0" />
          </View>
          <Text style={[styles.navText, styles.callNavText]}>
            Call
          </Text>
        </TouchableOpacity>

        {/* 4. WhatsApp Tab (Deep Emerald Leaf) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleWhatsApp}
          style={styles.navTab}
        >
          <View style={[styles.iconCircle, styles.whatsappIconCircle]}>
            <MessageCircle size={18} color="#FAF6F0" />
          </View>
          <Text style={[styles.navText, styles.whatsappNavText]}>
            WhatsApp
          </Text>
        </TouchableOpacity>

        {/* 5. Book Tab (Warm Golden Sand) */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('/contact')}
          style={styles.navTab}
        >
          <View style={[styles.iconCircle, styles.bookIconCircle, isBook && styles.activeBookIconCircle]}>
            <Zap size={18} color={isBook ? '#24160E' : '#E2B98E'} fill={isBook ? '#24160E' : '#E2B98E'} />
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
    backgroundColor: 'rgba(20, 38, 28, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(226, 185, 142, 0.35)',
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    ...({
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 0 16px 1px rgba(226, 185, 142, 0.2)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(226, 185, 142, 0.15)',
  },
  activeIconCircle: {
    backgroundColor: 'rgba(226, 185, 142, 0.2)',
    borderColor: '#E2B98E',
    ...({
      boxShadow: '0 0 12px rgba(226, 185, 142, 0.35)',
    } as any),
  },
  callIconCircle: {
    backgroundColor: '#6E4331',
    borderColor: '#8E5841',
    ...({
      backgroundImage: 'linear-gradient(135deg, #7A4935 0%, #523122 100%)',
      boxShadow: '0 3px 12px rgba(110, 67, 49, 0.5)',
    } as any),
  },
  whatsappIconCircle: {
    backgroundColor: '#2A5A3B',
    borderColor: '#3D7D53',
    ...({
      backgroundImage: 'linear-gradient(135deg, #326945 0%, #1F452C 100%)',
      boxShadow: '0 3px 12px rgba(42, 90, 59, 0.5)',
    } as any),
  },
  bookIconCircle: {
    backgroundColor: 'rgba(226, 185, 142, 0.15)',
    borderColor: 'rgba(226, 185, 142, 0.4)',
  },
  activeBookIconCircle: {
    backgroundColor: '#E2B98E',
    borderColor: '#E2B98E',
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D2DCD2',
    marginTop: 3,
  },
  activeNavText: {
    color: '#E2B98E',
    fontWeight: '700',
  },
  callNavText: {
    color: '#E2B98E',
    fontWeight: '700',
  },
  whatsappNavText: {
    color: '#9BBF9C',
    fontWeight: '700',
  },
});
