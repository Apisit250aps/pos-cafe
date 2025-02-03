'use client';
import ButtonLoading from '@/components/actions/button/ButtonLoading';
import DialogModal, {
  closeModal,
  openModal
} from '@/components/actions/modal/DialogModal';
import CardContent from '@/components/display/card/CardContent';
import TableData from '@/components/display/table/TableData';
import InputField from '@/components/form/input/InputField';
import SelectField from '@/components/form/input/SelectField';
import { ICategory } from '@/models/category';
import { Pagination } from '@/services';
import {
  addCategory,
  editCategory,
  fetchCategories,
  removeCategory
} from '@/services/category';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Category() {
  const [category, setCategory] = useState<Partial<ICategory>>({
    name: '',
    description: '',
    useFor: 'item'
  });
  const [onDataLoad, setLoadingData] = useState<boolean>(true);
  const [onFormLoad, setLoadingForm] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 0,
    totalDocs: 10,
    totalPages: 1
  });

  const fetchCategoryData = useCallback(
    async function () {
      try {
        setLoadingData(true);
        const {
          data,
          pagination: pg,
          success,
          message
        } = await fetchCategories({
          page: pagination.page,
          limit: pagination.limit
        });
        if (!success) {
          throw new Error(message);
        }
        setCategories(data!);
        setPagination(pg!);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error instanceof Error ? error.message : 'An error occurred',
          icon: 'error'
        });
      } finally {
        setLoadingData(false);
      }
    },
    [pagination.limit, pagination.page]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoadingForm(true);
      if (category._id) {
        const { success, message, data } = await editCategory(
          category as ICategory
        );
        closeModal('category-modal');
        if (!success) {
          throw new Error(message);
        }
        Swal.fire({
          title: message,
          icon: 'success'
        });
        setCategories((prevCategories) =>
          (prevCategories || []).map((c) => (c._id === data!._id ? data! : c))
        );
      } else {
        const { success, message, data } = await addCategory(
          category as ICategory
        );
        closeModal('category-modal');
        if (!success) {
          throw new Error(message);
        }
        categories.push(data as ICategory);
        Swal.fire({
          title: message,
          icon: 'success'
        });
      }
      setCategory({ name: '', description: '', useFor: 'item' });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'An error occurred',
        icon: 'error'
      });
    } finally {
      setLoadingForm(false);
    }
  };

  const setAdd = function () {
    setCategory({ _id: undefined, name: '', description: '', useFor: 'item' });
    openModal('category-modal');
  };

  const setEdit = function (cat: ICategory) {
    setCategory(cat);
    openModal('category-modal');
  };

  const setDelete = function (catId: string) {
    try {
      Swal.fire({
        title: 'Delete Category',
        text: 'Are you sure you want to delete this category?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoadingForm(true);
          const { success, message } = await removeCategory(catId);
          if (!success) {
            throw new Error(message);
          }
          Swal.fire({
            title: message,
            icon: 'success'
          });
          setCategories((prevCategories) =>
            prevCategories.filter((c) => c._id !== catId)
          );
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'An error occurred',
        icon: 'error'
      });
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);
  return (
    <>
      <DialogModal id="category-modal">
        <h3>Add Category</h3>
        <form onSubmit={handleSubmit}>
          <InputField
            label={'Name'}
            placeholder="category name"
            autoFocus
            value={category.name}
            onChange={(e) =>
              setCategory({ ...category, name: e.target.value.toLowerCase() })
            }
          />
          <InputField
            label={'Description'}
            placeholder="Description"
            value={category.description}
            onChange={(e) =>
              setCategory({
                ...category,
                description: e.target.value.toLowerCase()
              })
            }
          />
          <SelectField
            indexDefault
            label={'For'}
            options={['item', 'menu']}
            value={category.useFor}
            onChange={(e) =>
              setCategory({
                ...category,
                useFor: e.target.value as 'item' | 'menu'
              })
            }
          />
          <div className="form-control mt-5">
            <ButtonLoading className="btn-outline" loading={onFormLoad}>
              Add Category
            </ButtonLoading>
          </div>
        </form>
      </DialogModal>
      <CardContent
        title="Category"
        actions={
          <>
            <button type="button" className="btn" onClick={setAdd}>
              <i className="bx bx-message-square-add"></i>
            </button>
          </>
        }
      >
        <TableData
          loading={onDataLoad}
          data={categories}
          map={{
            name: 'หมวดหมู่',
            description: 'รายละเอียด',
            useFor: 'ใช้สำหรับ'
          }}
          action
          onEdit={setEdit}
          onDelete={setDelete}
        />
      </CardContent>
    </>
  );
}
