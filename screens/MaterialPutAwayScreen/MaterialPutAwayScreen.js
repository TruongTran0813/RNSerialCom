import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {materialPutAwayService} from '../../services';
import {Button} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';

export default function MaterialPutAwayScreen() {
  const isFocused = useIsFocused();

  const [materialPutAwayState, setMaterialPutAwayState] = useState({
    isLoading: false,
    data: [],
    totalRow: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    moreLoading: false,
    isListEnd: false,
  });
  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, materialPutAwayState.page, materialPutAwayState.searchData]);

  const fetchData = async () => {
    if (materialPutAwayState.page === 1) {
      setMaterialPutAwayState(prev => ({...prev, loading: true}));
    } else {
      setMaterialPutAwayState(prev => ({...prev, moreLoading: true}));
    }
    const params = {
      page: materialPutAwayState.page,
      pageSize: materialPutAwayState.pageSize,
    };

    const result = await materialPutAwayService.getAll(params);
    if (result?.success) {
      const itemList = result?.data?.list ?? [];
      const TotalRow = result?.data?.count ?? 0;
      const dataList =
        materialPutAwayState.page === 1
          ? itemList
          : materialPutAwayState.data.concat(itemList);
      setMaterialPutAwayState(prev => {
        return {
          ...prev,
          data: dataList,
          totalRow: TotalRow ?? 0,
          loading: false,
          moreLoading: false,
          isListEnd: dataList.length >= TotalRow ? true : false,
        };
      });
    } else {
      alert('System error');
      setMaterialPutAwayState(prev => ({
        ...prev,
        data: [],
        loading: false,
        moreLoading: false,
        isListEnd: true,
      }));
    }
  };
  const onRefresh = () => {
    if (materialPutAwayState.page == 1) {
      fetchData();
    } else {
      setMaterialPutAwayState({
        ...materialPutAwayState,
        page: 1,
      });
    }
  };
  const onEndReachedCalledDuringMomentum = useRef(true);
  const loadMoreData = useCallback(() => {
    if (
      !materialPutAwayState.isListEnd &&
      !materialPutAwayState.moreLoading &&
      !materialPutAwayState.loading &&
      !onEndReachedCalledDuringMomentum.current
    ) {
      setMaterialPutAwayState({
        ...materialPutAwayState,
        page: materialPutAwayState.page + 1,
      });
    }
  }, [materialPutAwayState, onEndReachedCalledDuringMomentum.current]);
  return (
    <View style={styles.container}>
      {materialPutAwayState.loading ? (
        <Spinner visible={true} />
      ) : (
        <FlatList
          data={materialPutAwayState.data}
          renderItem={({item}) => (
            <View style={styles.wrapItem}>
              <Text style={[styles.itemText]}>Code: </Text>
              <Text bold style={[styles.itemText]}>
                {item.name}
              </Text>
            </View>
          )}
          moreLoading={materialPutAwayState.moreLoading}
          isListEnd={materialPutAwayState.isListEnd}
          onEndReached={loadMoreData}
          keyExtractor={(item, index) => index}
          onMomentumScrollBegin={() =>
            (onEndReachedCalledDuringMomentum.current = false)
          }
          refreshControl={
            <RefreshControl
              refreshing={materialPutAwayState.loading}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  wrapItem: {
    backgroundColor: '#ccc',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 5,
  },

  itemText: {
    color: '#000',
    fontSize: 13,
  },
});
